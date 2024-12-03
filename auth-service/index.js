require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const signupRoute = require('./routes/authRoutes');

const app = express();
app.use(express.json());

if (!process.env.DB_URI) {
    console.error('Erreur : MONGO_URI n\'est pas défini dans le fichier .env');
    process.exit(1); 
}

// Connexion à MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur de connexion MongoDB :', err));

app.get('/', (req, res) => res.send('Serveur opérationnel'));
app.use('/auth', signupRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Serveur de auth est démarré sur le port ${PORT}`));
