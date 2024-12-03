const express = require('express');
const { signup, login } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'cette route est protégée', user: req.user });
});

module.exports = router;
