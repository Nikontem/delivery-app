const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        verified:{
            type: Boolean,
            default: false
        }
    },
    phoneNumber: {
        number: {
            type: Number,
            required: false
        },
        verified: {
            type: Boolean,
            default: false
        },
        required: true
    },
    email: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    cards: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);