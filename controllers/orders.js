`use strict`;
/**
 * Module Dependencies
 */

/**
 * Custom Dependencies
 */
const {operationSuccess} = require("../util/common_reponses");
const OrderService = require('../service/orders-service');
const BasicController = require('./basic-controller');

class OrdersController extends BasicController {
    async placeOrder(req, res, next) {
        this.validationErrors(req,res,next);

        //Check if a user is logged to retrieve info before
        const orderDTO = req.body.order;
        orderDTO.userId = req.userId;
        try {
            const result = OrderService.placeOrder(orderDTO);
            operationSuccess(res, result);
        } catch (error) {
            this.forwardError(next, 500, 'Placing order failed with error');
        }
    }

    async getOrder(req, res, next) {
        this.validationErrors(req,res,next);

        const id = req.params.id;
        try {
            const order = await OrderService.findById(id);
            operationSuccess(res, order);
        } catch (error) {
            this.forwardError(next, 500, 'Something went wrong');
        }
    }

    async deleteOrder(req, res, next) {
        this.validationErrors(req,res,next);

        const id = req.params.id;
        try {
            await OrderService.deleteById(id);
            operationSuccess(res, order);
        } catch (error) {
            this.forwardError(next, 500, 'Something went wrong');
        }
    }

    async getOrders(req, res, next) {
        this.validationErrors(req,res,next);

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
            this.forwardError(next, 500, 'Something went wrong with fetching orders');
        }
    }

    async editOrders(req, res, next) {
        this.validationErrors(req,res,next);

        const orderDTO = req.body.order;
        try {
            await OrderService.createUpdateObject(orderDTO, 'Order');
            operationSuccess(res, {});
        } catch (error) {
            this.forwardError(next, 500, 'Could not update order')
        }
    }

    async markCompleted(req, res, next) {
        this.validationErrors(req,res,next);

        const orderId = req.params.orderId;
        try {
            await OrderService.markCompleted(orderId);
        } catch (error) {
            this.forwardError(next, 500, 'Something went wrong');
        }
    }
}

module.exports = new OrdersController();

