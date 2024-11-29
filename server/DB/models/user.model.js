const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    instruments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'instruments'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;