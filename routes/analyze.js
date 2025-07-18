const express = require('express');
const puppeteer = require('puppeteer');
const { analyzeColors } = require('../utils/colorAnalysis');
const router = express.Router();

// Fonction de validation d'URL
function validateUrl(url) {
    try {
        const urlObj = new URL(url);
        
        if (urlObj.protocol !== 'https:') {
            return { valid: false, error: 'Only HTTPS URLs are supported' };
        }
        
        const hostname = urlObj.hostname.toLowerCase();
        if (hostname === 'localhost' || 
            hostname === '127.0.0.1' || 
            hostname.startsWith('192.168.') ||
            hostname.startsWith('10.') ||
            hostname.startsWith('172.') ||
            hostname.endsWith('.local')) {
            return { valid: false, error: 'Local URLs are not supported' };
        }
        
        return { valid: true };
    } catch (error) {
        return { valid: false, error: 'Invalid URL format' };
    }
}

router.post('/analyze-website', async (req, res) => {
    try {
        const { url, theme = 'dark' } = req.body;
        
        const validation = validateUrl(url);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }
        
        // Configuration Puppeteer pour Docker
        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-web-security',
                '--disable-extensions',
                '--no-first-run',
                '--disable-default-apps',
                //Optimisations pour Docker
                '--disable-plugins',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-renderer-backgrounding'
            ]
        });
        
        const page = await browser.newPage();
        
        // Pas de limite de timeout !
        page.setDefaultTimeout(30000);
        
        await page.emulateMediaFeatures([
            { name: 'prefers-color-scheme', value: theme }
        ]);
        
        await page.setViewport({ width: 1920, height: 1080 });
        
        try {
            await page.goto(url, { 
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });
        } catch (error) {
            await browser.close();
            if (error.message.includes('timeout')) {
                return res.status(408).json({ error: 'Website took too long to respond' });
            }
            return res.status(500).json({ error: 'Unable to access the website' });
        }
        
        const siteMetadata = await page.evaluate(() => {
            const title = document.title || 'No title';
            const description = document.querySelector('meta[name="description"]')?.content || 
                              document.querySelector('meta[property="og:description"]')?.content || 
                              'No description available';
            
            let favicon = document.querySelector('link[rel="icon"]')?.href ||
                         document.querySelector('link[rel="shortcut icon"]')?.href ||
                         document.querySelector('link[rel="apple-touch-icon"]')?.href ||
                         '/favicon.ico';
            
            if (favicon && !favicon.startsWith('http')) {
                try {
                    favicon = new URL(favicon, window.location.origin).href;
                } catch (e) {
                    favicon = null;
                }
            }
            
            return { title, description, favicon };
        });
        
        const screenshot = await page.screenshot({
            type: 'jpeg',
            fullPage: true,
            quality: 80,
        });
        await browser.close();
        
        const colorAnalysis = await analyzeColors(screenshot);
        const screenshotBase64 = screenshot.toString('base64');
        
        res.json({
            ...colorAnalysis,
            screenshot: `data:image/png;base64,${screenshotBase64}`,
            siteMetadata,
            metadata: {
                url: url,
                theme: theme,
                timestamp: new Date().toISOString(),
                screenshotSize: screenshot.length
            }
        });
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ 
            error: 'Internal server error during analysis' 
        });
    }
});

// Copiez ici vos fonctions getRelativeLuminance, isDarkColor, analyzeColors

module.exports = router;