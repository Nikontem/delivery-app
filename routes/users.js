`use strict`;

const express = require('express');
const router = express.Router();

const {isAuthenticated, isAdmin} = require('../middleware/is-auth');
const userController = require('../controllers/users');
const {signUpValidator, idParamValidator} = require('../middleware/body-validator');

/* GET users listing. */
router.post('/login', userController.login);
router.post('/signup', signUpValidator, userController.createUpdateUser);
router.put('/update', isAuthenticated, isAdmin, signUpValidator, userController.createUpdateUser);
router.get('/:id', idParamValidator,isAuthenticated, isAdmin, userController.getUser);
router.delete('/:id', idParamValidator, isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;
