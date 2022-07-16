`use strict`;

const express = require('express');
const router = express.Router();
const {isAuthenticated, isAdmin} = require('../middleware/is-auth');
const {idParamValidator} = require('../middleware/body-validator');


const ExtraOptionsController = require('../controllers/extra-options');

router.get('/', ExtraOptionsController.getExtraOptions);
router.get('/:id', idParamValidator, isAuthenticated, isAdmin, ExtraOptionsController.getExtraOption);
router.delete('/deleteExtraOptions/:id', idParamValidator, isAuthenticated, isAdmin, ExtraOptionsController.deleteExtraOptions);
router.put('/update-extra-option', isAuthenticated, isAdmin, ExtraOptionsController.createUpdateExtraOption);
router.post('/create-extra-option', isAuthenticated, isAdmin, ExtraOptionsController.createUpdateExtraOption);


module.exports = router;