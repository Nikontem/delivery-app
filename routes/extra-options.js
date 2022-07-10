const express = require('express');
const router = express.Router();


router.get('/');
router.get('/:id');
router.delete('/:id');
router.put('/update-extra-option');
router.post('/create-extra-option');

module.exports = router;