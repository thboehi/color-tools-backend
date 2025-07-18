# Color Tools Backend - API d'Efficacité Énergétique OLED

<div align="center">

**[🇺🇸 English](README.md)** | **🇫🇷 Français**

</div>

## 🎯 Aperçu

**Color Tools Backend** est le serveur API qui alimente la boîte à outils web Color Tools pour analyser l'efficacité énergétique des interfaces web sur les écrans OLED. Ce backend gère l'analyse de sites web, la capture d'écrans et le traitement des couleurs pour fournir des métriques d'efficacité énergétique en temps réel.

### Que fait-il ?

- **🔍 API d'Analyse de Sites Web** : Capture et analyse la composition colorimétrique de n'importe quel site web
- **📸 Service de Capture d'Écran** : Capture d'images haute performance avec Puppeteer
- **🎨 Traitement des Couleurs** : Algorithmes avancés d'analyse des couleurs avec Sharp
- **⚡ Notation d'Efficacité Énergétique** : Calculs de consommation énergétique OLED en temps réel
- **🏆 Génération de Badges** : Création dynamique de badges SVG pour les scores d'efficacité énergétique

Ce backend est conçu pour fonctionner parfaitement avec le [Frontend Color Tools](https://github.com/thboehi/color-tester).

## 🛠️ Technologies et Librairies

### Cœur
- **[Node.js 18+](https://nodejs.org/)** - Runtime JavaScript
- **[Express.js](https://expressjs.com/)** - Framework web pour les routes API
- **[CORS](https://github.com/expressjs/cors)** - Partage de ressources entre origines

### Traitement et Analyse d'Images
- **[Puppeteer](https://pptr.dev/)** - Automatisation de navigateur pour les captures d'écran
- **[Sharp](https://sharp.pixelplumbing.com/)** - Traitement d'images haute performance
- **Analyse de Couleurs Personnalisée** - Algorithmes avancés de luminance et d'efficacité énergétique

### Déploiement
- **[Docker](https://www.docker.com/)** - Conteneurisation avec Alpine Linux
- **Docker Compose** - Orchestration multi-conteneurs

## 🚀 Installation et Configuration

### Prérequis
- Node.js 18+
- npm, yarn, ou pnpm
- Docker (optionnel, recommandé pour la production)

### 1. Cloner le dépôt
```bash
git clone https://github.com/thboehi/color-tools-backend.git
cd color-tools-backend
```

### 2. Installer les dépendances
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Démarrer le serveur de développement
```bash
npm start
# ou
node server.js
```

L'API sera accessible à l'adresse [http://localhost:3001](http://localhost:3001)

### 4. Vérification de santé
Visitez [http://localhost:3001/health](http://localhost:3001/health) pour vérifier que le serveur fonctionne.

## 🐳 Déploiement Docker (Recommandé)

### Avec Docker Compose
```bash
# Construire et démarrer le conteneur
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter le conteneur
docker-compose down
```

### Construction Docker manuelle
```bash
# Construire l'image
docker build -t color-tools-backend .

# Exécuter le conteneur
docker run -p 3001:3001 --name color-tools-api color-tools-backend
```

## 📡 Points de Terminaison API

### Analyse de Site Web
```http
POST /api/analyze-website
Content-Type: application/json

{
  "url": "https://example.com",
  "theme": "dark" // optionnel: "dark" | "light"
}
```

**Réponse :**
```json
{
  "dominantColors": [...],
  "darkPercentage": 65.2,
  "lightPercentage": 34.8,
  "totalColors": 156,
  "screenshot": "data:image/jpeg;base64,...",
  "siteMetadata": {
    "title": "Site Exemple",
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

### Vérification de Santé
```http
GET /health
```

**Réponse :**
```json
{
  "status": "OK",
  "timestamp": "2025-01-18T12:00:00.000Z"
}
```

## 🎨 Fonctionnalités d'Analyse des Couleurs

### Calcul de Luminance Avancé
- **Calculs de luminance conformes W3C WCAG 2.1**
- **Correction gamma sRGB** pour une représentation précise des couleurs
- **Analyse de luminosité perceptuelle** pour l'optimisation OLED

### Algorithmes d'Efficacité Énergétique
- **Modélisation de consommation énergétique spécifique OLED**
- **Optimisation des pixels bleus** (coût énergétique élevé sur OLED)
- **Analyse de saturation et de valeur** pour un scoring complet

### Échantillonnage Intelligent
- **Taux d'échantillonnage adaptatif** pour l'optimisation des performances
- **Regroupement de couleurs** pour l'extraction des couleurs dominantes
- **Traitement en temps réel** avec redimensionnement d'image optimisé

## ⚙️ Configuration

### Variables d'Environnement
```env
NODE_ENV=production
PORT=3001
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
```

### Configuration CORS
L'API accepte les requêtes depuis :
- `http://localhost:3000` (développement)
- `http://192.168.1.112:3000` (réseau local)
- `https://ct.thbo.ch` (frontend de production)

### Optimisations Docker
- **Image de base Alpine Linux** pour une empreinte minimale
- **Construction multi-étapes** pour l'optimisation en production
- **Utilisateur non-root** pour une sécurité renforcée
- **Navigateur Chromium** pré-installé pour Puppeteer

## 🔧 Optimisations de Performance

### Traitement d'Images
- **Compression JPEG** avec optimisation de qualité
- **Dimensionnement de viewport intelligent** (1920x1080)
- **Échantillonnage de couleurs efficace** avec taux configurables
- **Pipeline de traitement Sharp économe en mémoire**

### Automatisation de Navigateur
- **Chromium headless** avec optimisation Docker
- **Flags de navigateur minimaux** pour un démarrage plus rapide
- **Gestion des timeouts** pour un traitement fiable
- **Nettoyage des ressources** pour éviter les fuites mémoire

## 🚀 Déploiement en Production

### Docker Compose (Recommandé)
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

### Déploiement Manuel
1. Construire l'application : `npm run build` (si applicable)
2. Définir les variables d'environnement
3. Démarrer avec un gestionnaire de processus : `pm2 start server.js`
4. Configurer un reverse proxy (nginx/apache)
5. Configurer les certificats SSL

## 🧪 Tests

### Tests API Manuels
```bash
# Tester le point de terminaison de santé
curl http://localhost:3001/health

# Tester l'analyse de site web
curl -X POST http://localhost:3001/api/analyze-website \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Tests de Charge
L'API est optimisée pour les requêtes concurrentes avec :
- **Gestion efficace de la mémoire**
- **Réutilisation d'instances de navigateur**
- **Gestion des timeouts**
- **Mécanismes de récupération d'erreur**

## 🛡️ Fonctionnalités de Sécurité

- **Validation d'URL** pour prévenir les attaques SSRF
- **Analyse de sites web HTTPS uniquement**
- **Blocage de réseau local** pour la sécurité
- **Assainissement des entrées** pour tous les paramètres
- **Conteneurs Docker non-root**
- **Surface d'attaque minimale** avec Alpine Linux

## 🤝 Intégration avec le Frontend

Ce backend est conçu pour fonctionner avec le [Frontend Color Tools](https://github.com/thboehi/color-tester). Le frontend attend :

- API fonctionnant sur le port **3001**
- CORS configuré pour les domaines frontend
- Formats de réponse compatibles
- Génération de captures d'écran en temps réel

## 🙏 Remerciements

- **SAE Institute** pour le soutien académique et les ressources
- **L'équipe Puppeteer** pour d'excellents outils d'automatisation de navigateur
- **Les contributeurs Sharp** pour le traitement d'images haute performance
- **La communauté Express.js** pour le framework web robuste
- **La communauté Docker** pour les meilleures pratiques de conteneurisation

## 📄 Licence et Contexte Académique

Ce projet a été développé dans le cadre d'un mémoire de bachelor au SAE Institute de Genève, axé sur l'optimisation énergétique pour les écrans OLED grâce à l'analyse intelligente des couleurs.

## 🌱 Impact Environnemental

Chaque appel API contribue à sensibiliser au design web économe en énergie. En fournissant aux développeurs un retour en temps réel sur leurs choix de couleurs, ce backend aide à créer un écosystème numérique plus durable.

---

**🌱 Pour un web plus vert, un pixel à la fois.**

[![Efficacité Énergétique OLED](https://ct.thbo.ch/api/badge?website=https://ct.thbo.ch&score=85)](https://ct.thbo.ch)

---

📧 **Contact** : [thomas@thbo.ch](mailto:thomas@thbo.ch)  
🌐 **Portfolio** : [thbo.ch](https://thbo.ch)  
🎓 **Institution** : SAE Institute Genève  
🔗 **Frontend** : [Frontend Color Tools](https://github.com/thboehi/color-tester)