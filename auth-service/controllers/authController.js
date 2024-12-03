const bcrypt = require('bcrypt');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Fonction signup
const signup = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Fonction login
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User non inconnu' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'mdp incorrect' });
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    console.log("Connexion réussie");
    console.log(req.body);
    console.log("the token is :", token);
    

    res.status(200).json({ message: 'Connexion réussie', token });
};

module.exports = { signup, login };
