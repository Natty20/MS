const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: { type: String, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

userSchema.plugin(uniqueValidator, { message: '{PATH} doit être unique.' });

module.exports = mongoose.model('User', userSchema);