const express = require('express');
const router = express.Router();

router.get('/');
router.get('/:id');
router.put('/menu-item');
router.delete('/menu-item')

module.exports = router;