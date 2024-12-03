const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy vers le Auth Service
app.use('/auth', createProxyMiddleware({
    target: 'http://localhost:4000/',
    changeOrigin: true
}));

// Lancement du serveur
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Gateway en cours d'exécution sur le port ${PORT}`));
