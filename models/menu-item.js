`use strict`;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItem = new Schema({
    category: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true
    },
    imgFilePath: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MenuItem', menuItem);

