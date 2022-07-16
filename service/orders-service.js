`use strict`;

const mongoose = require('mongoose');

const BasicService = require('./basic-service');
const Order = require("../models/order");
const MenuItem = require("../models/menu-item");
const ExtraOption = require("../models/extra-option");
const {deliveryStatus} = require("../enums/order-status");

class OrdersService extends BasicService {
    constructor() {
        super(OrdersService);
        if (OrdersService._instance) {
            return OrdersService._instance;
        }
        OrdersService._instance = this;
    }

    async placeOrder(orderDTO) {
        try {
            const finalObject = await this.createOrder(orderDTO);
            const session = await mongoose.startSession();
            const order = await session.withTransaction(async () => {
                await Order.create([finalObject], {session});
            });
            await session.commitTransaction();
            return {_id: order._id, message: 'Order Placed'};
        } catch (error) {
            await session.abortTransaction();
            throw error;
        }
    }

    async markCompleted(orderId) {
        await Order.findOneAndUpdate({_id: orderId}, {status: deliveryStatus.COMPLETED});
    }

    async createOrder(orderDTO) {

        /**
         * For each item plus it's extra options
         * Retrieve all related info
         * Gradually Build order items
         */
        const order = new Order({
            wayOfPay: orderDTO.wayOfPay,
            total: 0,
            orderContents: [],
            comments: orderDTO.comments,
            deliveryType: orderDTO.deliveryType,
            completed: orderDTO.completed
        });

        const cartItems = orderDTO.cartItems;
        const productQuantityMap = new Map();
        cartItems.forEach(ci => productQuantityMap.set(ci._id, ci));


        for (const cartProduct of cartItems) {
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
        }
        return order;
    }
}

module.exports = new OrdersService();