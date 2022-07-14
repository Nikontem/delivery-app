const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

/* GET users listing. */
router.post('/signup', userController.createUpdateUser);
router.put('/update', userController.createUpdateUser);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
