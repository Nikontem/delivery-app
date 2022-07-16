`use strict`;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extraOptionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('ExtraOption', extraOptionSchema)