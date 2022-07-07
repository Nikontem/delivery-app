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

        }
    ],
    comments: String,
    delivery: {
        type: Boolean,
        default: true
    },
    completed: {
        type: Boolean,
        default: false
    }

}));

module.exports = mongoose.model('Post', orderSchema);