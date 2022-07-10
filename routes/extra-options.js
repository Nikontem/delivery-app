const express = require('express');
const router = express.Router();


router.get('/');
router.get('/:id');
router.put('/extra-option');
router.delete('/extra-option');

module.exports = router;