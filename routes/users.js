const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

/* GET users listing. */
router.post('/signup', userController.createUser);
router.post('/create-user', userController.updateUser);

module.exports = router;
