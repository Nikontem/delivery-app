const express = require('express');
const router = express.Router();

const orderController = require("../controllers/orders")

router.get('/',orderController.getOrders);
router.post('/submit-order', orderController.placeOrder);
//TODO Only for Admin
router.put('/update-order', orderController.editOrders);
router.put('/mark-completed', orderController.markCompleted);
module.exports = router;