const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Récupérer le token Bearer

    if (!token) return res.status(401).json({ message: 'cette accès interdit : token manquant' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token invalide' });

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
