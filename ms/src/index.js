require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000;

// Middleware pour JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connecté'))
    .catch((err) => console.error('Erreur MongoDB :', err));

// Route simple
app.get('/', (req, res) => {
    res.send('API Fonctionnelle !');
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
