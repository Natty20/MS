const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Vérifier si l'utilisateur existe deja
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà connu' });
        }

        // Créer un nouvel utilisateur
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User créé avec succès!' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur du serveur', details: error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur inconnu' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Connexion réussie!', token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur', details: error });
    }
});

module.exports = router;
