/**
 * Module Dependencies
 */
const mongoose = require('mongoose');
const createError = require('http-errors');
const orderStatus = require('../enums/order-status')

const session = await mongoose.startSession();


/**
 * Custom Dependencies
 */
const Order = require('../models/order');
const Restaurant = require('../models/restaurant');
const MenuItem = require('../models/menu-item');
const ExtraOption = require('../models/extra-option');
const {operationSuccess} = require("../util/common_reponses");
const User = require("../models/user");

exports.placeOrder = async (req, res, next) => {
    //Check if a user is logged to retrieve info before
    const order = await createOrder(req.body.order);
    try {
        await session.withTransaction(async () => {
            await Order.create([order], {session});
        });
        await session.commitTransaction();
        operationSuccess(res, {_id: order._id, message: 'Order Placed'});
    } catch (error) {
        await session.abortTransaction();
        next(createError(500, 'Placing order failed with error' + error));
    }
}

exports.getOrders = async (req, res, next) => {
    const page = req.query.page || 1;
    const perPage = req.query.limit || 10;
    const status = req.query.status;
    const filter = {};
    if(status){
        filter.status = status;
    }

    try {
        const totalItems = await Order.find(filter).countDocuments();
        const results = await Order.find(filter).skip((page - 1) * perPage).limit(perPage);
        return {
            orders: results,
            totalItems: totalItems
        }
    }catch(error){
        next(createError(500, 'Something went wrong with fetching orders' + error));
    }
}

exports.editOrders = async (req, res, next) => {
        const jsonOrder = req.body.order;
        try{
            await Order.updateOne({jsonOrder});
        }catch (error){
            next(createError(500, 'Could not update order '+ error))
        }
}

const createOrder = async (jsonOrder) => {

    /**
     * For each item plus it's extra options
     * Retrieve all related info
     * Gradually Build order items
     */
    const order = new Order({
        wayOfPay: jsonOrder.wayOfPay,
        total: 0,
        orderContents: [],
        comments: jsonOrder.comments,
        deliveryType: jsonOrder.deliveryType,
        completed: jsonOrder.completed
    });

    const cartItems = jsonOrder.cartItems;
    const productQuantityMap = new Map();
    cartItems.forEach( ci => productQuantityMap.set(ci._id, ci));


    for(const cartProduct of cartItems){
        try {
            const databaseProduct = await MenuItem.findById(product._id);
            const orderEntry = {...databaseProduct};
            orderEntry.quantity = cartProduct.quantity;
            delete orderEntry.imgFile;

            if (product.extras) {
                orderEntry.extraOptions = [];
                const extraOptions = await ExtraOption.find({
                    _id: {
                        '$in': [...product.extras.keys()]
                    }
                });
                jsonOrder.total += cartProduct.quantity * databaseProduct.price;
                for (const extraOption of extraOptions) {
                    const orderExtraOption = {...extraOption};
                    delete orderExtraOption.categories;
                    orderEntry.extraOptions.push(orderExtraOption);
                    const extraOptionQuantity = cartProduct.extras.get(extraOption._id);
                    orderExtraOption.quantity = extraOptionQuantity;
                    jsonOrder.total += extraOption.price * extraOptionQuantity;
                }
                order.orderContents.push(orderEntry);
            }
        }catch(error){
            throw Error(error);
        }
    }

    return order;
}