/**
 * Module Dependencies
 */
const createError = require('http-errors');


/**
 * Custom Dependencies
 */
const Order = require('../models/order');
const {deliveryStatus} = require('../enums/order-status')
const {operationSuccess} = require("../util/common_reponses");
const OrderService = require('../service/orders-service');

exports.placeOrder = async (req, res, next) => {
    //Check if a user is logged to retrieve info before
    const jsonOrder = req.body.order;
    jsonOrder.userId = req.userId;
    try {
        const result = OrderService.placeOrder(jsonOrder);
        operationSuccess(res, result);
    } catch (error) {
        next(createError(500, 'Placing order failed with error' + error));
    }
}

exports.getOrders = async (req, res, next) => {
    const paginateParams = {
        page: req.query.page || 1,
        limit: req.query.limit || 10
    };

    const status = req.query.status;
    const filter = {};
    if (status) {
        filter.status = status;
    }

    try {
        const results = OrderService.paginate(filter, paginateParams);
        operationSuccess(res, results);
    } catch (error) {
        next(createError(500, 'Something went wrong with fetching orders' + error));
    }
}

exports.editOrders = async (req, res, next) => {
    const jsonOrder = req.body.order;
    try {
        await OrderService.createUpdateObject(jsonOrder, 'Order');
        operationSuccess(res, {});
    } catch (error) {
        next(createError(500, 'Could not update order ' + error))
    }
}

exports.markCompleted = async (req, res, next) => {
    const orderId = req.params.orderId;
    try {
        await OrderService.markCompleted(orderId);
    } catch (error) {
        next(createError(500, 'Something went wrong ' + error));
    }
}

