const express = require('express');
const router = express.Router();

const extraOptionsController = require('../controllers/extra-options');

router.get('/', extraOptionsController.getExtraOptions);
router.get('/:id', extraOptionsController.getExtraOption);
router.delete('/deleteExtraOptions', extraOptionsController.deleteExtraOptions);
router.put('/update-extra-option', extraOptionsController.createUpdateExtraOption);
router.post('/create-extra-option', extraOptionsController.createUpdateExtraOption);

module.exports = router;