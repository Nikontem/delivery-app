const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    minimumCharge:{
        type: Number,
    },
    menu:{
        required: true,
        entries: [
            {
                categoryName: {
                    type: String,
                    required: true,
                    index: true,
                    unique: true
                },
                items: [
                    {
                        required: true,
                        _id: {
                            type: Schema.Types.ObjectId,
                            required: true,
                            index: true
                        },
                        imageFile:{
                            type: String,
                            required: true
                        },
                        name:{
                            type: String,
                            unique: true,
                            required: true
                        },
                        price: {
                            type: Number,
                            required: true
                        }
                    }
                ],
                extraOptions:[
                    {
                        _id: {
                            type: Schema.Types.ObjectId,
                            required: true,
                            index: true
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
                ],
                required: true
            }
        ]
    }
});


module.exports = mongoose.model('Restaurant', restaurantSchema);