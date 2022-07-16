`use strict`;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    wayOfPay: {
        type: String,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    orderContents:[
        {
            required: true,
            name:{
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            extraOptions: [
                {
                    quantity: {
                        type: Number,
                        required: true
                    },
                    name:{
                        type: String,
                        required: true
                    },
                    price: {
                        type: Number,
                        required: true
                    }
                }
            ]
        }
    ],
    comments: String,
    deliveryType: {
        type: String,
        default: true
    },
    status: {
        type: String,
        default: 'Pending'
    }

}));

module.exports = mongoose.model('Post', orderSchema);