const express = require('express');
const router = express.Router();
const {idParamValidator} = require('../middleware/body-validator');

const {isAuthenticated, isAdmin} = require('../middleware/is-auth');

const MenuController = require('../controllers/menu-items');


router.get('/', authMiddlware, MenuController.getMenuItems);
router.get('/:id', authMiddlware, idParamValidator, MenuController.getMenuItem);
router.delete('/menu-item/:id', idParamValidator, authMiddlware, MenuController.deleteMenuItem);
router.put('/update-menu-item', isAuthenticated, isAdmin , MenuController.createUpdateMenuItem);
router.post('/create-menu-item', isAuthenticated, isAdmin , MenuController.createUpdateMenuItem);

module.exports = router;