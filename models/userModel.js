const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'please provide a name']
    },
    email: {
        type: String, 
        required: [true, 'please provide a email'],
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'please provide a password'],
    },
}, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);