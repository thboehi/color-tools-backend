# Color Tools Backend - OLED Energy Efficiency API

<div align="center">

**🇺🇸 English** | **[🇫🇷 Français](README_fr.md)**

</div>

## 🎯 Overview

**Color Tools Backend** is the API server powering the Color Tools web toolkit for analyzing energy efficiency of web interfaces on OLED displays. This backend handles website analysis, screenshot capture, and color processing to provide real-time energy efficiency metrics.

### What does it do?

- **🔍 Website Analysis API**: Captures and analyzes any website's color composition
- **📸 Screenshot Service**: High-performance image capture using Puppeteer
- **🎨 Color Processing**: Advanced color analysis algorithms using Sharp
- **⚡ Energy Efficiency Scoring**: Real-time OLED energy consumption calculations
- **🏆 Badge Generation**: Dynamic SVG badge creation for energy efficiency scores

This backend is designed to work seamlessly with the [Color Tools Frontend](https://github.com/thboehi/color-tester).

## 🛠️ Technologies & Libraries

### Core
- **[Node.js 18+](https://nodejs.org/)** - JavaScript runtime
- **[Express.js](https://expressjs.com/)** - Web framework for API routes
- **[CORS](https://github.com/expressjs/cors)** - Cross-origin resource sharing

### Image Processing & Analysis
- **[Puppeteer](https://pptr.dev/)** - Browser automation for website screenshots
- **[Sharp](https://sharp.pixelplumbing.com/)** - High-performance image processing
- **Custom Color Analysis** - Advanced luminance and energy efficiency algorithms

### Deployment
- **[Docker](https://www.docker.com/)** - Containerization with Alpine Linux
- **Docker Compose** - Multi-container orchestration

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Docker (optional, recommended for production)

### 1. Clone the repository
```bash
git clone https://github.com/thboehi/color-tools-backend.git
cd color-tools-backend
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start development server
```bash
npm start
# or
node server.js
```

The API will be accessible at [http://localhost:3001](http://localhost:3001)

### 4. Health check
Visit [http://localhost:3001/health](http://localhost:3001/health) to verify the server is running.

## 🐳 Docker Deployment (Recommended)

### Using Docker Compose
```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Manual Docker build
```bash
# Build the image
docker build -t color-tools-backend .

# Run the container
docker run -p 3001:3001 --name color-tools-api color-tools-backend
```

## 📡 API Endpoints

### Website Analysis
```http
POST /api/analyze-website
Content-Type: application/json

{
  "url": "https://example.com",
  "theme": "dark" // optional: "dark" | "light"
}
```

**Response:**
```json
{
  "dominantColors": [...],
  "darkPercentage": 65.2,
  "lightPercentage": 34.8,
  "totalColors": 156,
  "screenshot": "data:image/jpeg;base64,...",
  "siteMetadata": {
    "title": "Example Site",
    "description": "...",
    "favicon": "..."
  },
  "metadata": {
    "url": "https://example.com",
    "theme": "dark",
    "timestamp": "2025-01-18T...",
    "screenshotSize": 45231
  }
}
```

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-18T12:00:00.000Z"
}
```

## 🎨 Color Analysis Features

### Advanced Luminance Calculation
- **W3C WCAG 2.1 compliant** luminance calculations
- **sRGB gamma correction** for accurate color representation
- **Perceptual brightness** analysis for OLED optimization

### Energy Efficiency Algorithms
- **OLED-specific** energy consumption modeling
- **Blue pixel optimization** (high energy cost on OLED)
- **Saturation and value analysis** for comprehensive scoring

### Smart Sampling
- **Adaptive sampling rate** for performance optimization
- **Color grouping** for dominant color extraction
- **Real-time processing** with optimized image resizing

## ⚙️ Configuration

### Environment Variables
```env
NODE_ENV=production
PORT=3001
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

### CORS Configuration
The API accepts requests from:
- `http://localhost:3000` (development)
- `http://192.168.1.112:3000` (local network)
- `https://ct.thbo.ch` (production frontend)

### Docker Optimizations
- **Alpine Linux** base image for minimal footprint
- **Multi-stage build** for production optimization
- **Non-root user** for enhanced security
- **Chromium browser** pre-installed for Puppeteer

## 🔧 Performance Optimizations

### Image Processing
- **JPEG compression** with quality optimization
- **Smart viewport sizing** (1920x1080)
- **Efficient color sampling** with configurable rates
- **Memory-efficient** Sharp processing pipeline

### Browser Automation
- **Headless Chromium** with Docker optimization
- **Minimal browser flags** for faster startup
- **Timeout management** for reliable processing
- **Resource cleanup** to prevent memory leaks

## 🚀 Production Deployment

### Docker Compose (Recommended)
```yaml
version: '3.8'
services:
  color-analyzer-api:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    security_opt:
      - seccomp:unconfined
```

### Manual Deployment
1. Build the application: `npm run build` (if applicable)
2. Set environment variables
3. Start with process manager: `pm2 start server.js`
4. Configure reverse proxy (nginx/apache)
5. Set up SSL certificates

## 🧪 Testing

### Manual API Testing
```bash
# Test health endpoint
curl http://localhost:3001/health

# Test website analysis
curl -X POST http://localhost:3001/api/analyze-website \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Load Testing
The API is optimized for concurrent requests with:
- **Efficient memory management**
- **Browser instance reuse**
- **Timeout handling**
- **Error recovery mechanisms**

## 🛡️ Security Features

- **URL validation** to prevent SSRF attacks
- **HTTPS-only** website analysis
- **Local network blocking** for security
- **Input sanitization** for all parameters
- **Non-root Docker containers**
- **Minimal attack surface** with Alpine Linux

## 🤝 Integration with Frontend

This backend is designed to work with the [Color Tools Frontend](https://github.com/thboehi/color-tester). The frontend expects:

- API running on port **3001**
- CORS configured for frontend domains
- Compatible response formats
- Real-time screenshot generation

## 🙏 Acknowledgments

- **SAE Institute** for academic support and resources
- **Puppeteer team** for excellent browser automation tools
- **Sharp contributors** for high-performance image processing
- **Express.js community** for the robust web framework
- **Docker community** for containerization best practices

## 📄 License & Academic Context

This project was developed as part of a bachelor thesis at SAE Institute Geneva, focusing on energy optimization for OLED displays through intelligent color analysis.

### License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license.

**What this means:**
- ✅ **You are free to:** Use, copy, modify, and distribute this code
- ✅ **Attribution required:** You must give appropriate credit and cite this work
- ✅ **Educational & research use:** Fully permitted for academic and personal projects
- ❌ **No commercial use:** Commercial use, resale, or profit-making is prohibited
- ❌ **No warranty:** Software is provided "as-is" without any guarantees

**How to cite this work:**
```
Boehi, T. (2025). Color Tools Backend - OLED Energy Efficiency API. 
SAE Institute Geneva. Available at: https://github.com/thboehi/color-tools-backend
```

For commercial licensing inquiries, please contact: [thoma@thbo.ch](mailto:thoma@thbo.ch)

## 🌱 Environmental Impact

Every API call contributes to raising awareness about energy-efficient web design. By providing developers with real-time feedback on their color choices, this backend helps create a more sustainable digital ecosystem.

---

**🌱 For a greener web, one pixel at a time.**

[![OLED Energy Efficiency](https://ct.thbo.ch/api/badge?website=https://ct.thbo.ch&score=85)](https://ct.thbo.ch)

---

📧 **Contact**: [thomas@thbo.ch](mailto:thomas@thbo.ch)  
🌐 **Portfolio**: [thbo.ch](https://thbo.ch)  
🎓 **Institution**: SAE Institute Geneva  
🔗 **Frontend**: [Color Tools Frontend](https://github.com/thboehi/color-tester)