const express = require('express');
const router = express.Router();
const {idParamValidator, orderValidator, isAdmin} = require('../middleware/body-validator');

const {isAuthenticated, isAdmin} = require('../middleware/is-auth');
const orderController = require("../controllers/orders")

router.get('/',orderController.getOrders);
router.post('/submit-order', orderValidator, orderController.placeOrder);
//TODO Only for Admin
router.put('/:id', idParamValidator, authMiddlware, orderController.getOrder);
router.delete('/:id', idParamValidator, authMiddlware, orderController.deleteOrder);
router.put('/update-order', isAuthenticated, isAdmin, orderController.editOrders);
router.put('/mark-completed', isAuthenticated, isAdmin, orderController.markCompleted);
module.exports = router;