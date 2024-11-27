const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required:true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    instruments: [{
        type: mongoose.model.type.objectId,
        ref: 'instruments'
    }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;