/**
 * Module Dependencies
 */
const mongoose = require('mongoose');
const createError = require('http-errors');

const session = await mongoose.startSession();


/**
 * Custom Dependencies
 */
const Order = require('../models/order');
const Restaurant = require('../models/restaurant');
const {operationSuccess} = require("../util/common_reponses");

exports.placeOrder = (req, res, next) => {
    //Check if a user is logged to retrieve info before

}

exports.getOrders = (req, res, next) => {

}

exports.editOrders = (req, res, next) => {

}

exports.cancelOrder = (req, res, next) => {

}

const createOrder = (jsonOrder) => {

    /**
     * For each item plus it's extra options
     * Retrieve all related info
     * Gradually Build order items
     */
    const orderedItems = jsonOrder.orderedItems;
    for(const item of orderedItems){
        const itemInfo = Restaurant.aggregate([
            {
                "$match":{
                    "menu.entries.categoryName" : item.categoryName,
                    "menu.entries"
                }
            }
        ])

        // find([
        //     {
        //       'menu.entries': {
        //           elemMatch: {
        //               'categoryName': item.
        //           }
        //       }
        //     },
        //     {
        //     'menu.entries.items': {
        //         elemMatch: {
        //             '_id' : item.itemId
        //         }
        //     }
        // }])
    }
    const itemsIds = jsonOrder.orderedItems.map(i => i._id);

    return new Order({
        _id: jsonOrder._id,

    })
}