const express = require('express');
const router = express.Router();

router.get('/');
router.get('/:id');
router.delete('/menu-item')
router.put('/update-menu-item');
router.post('/create-menu-item');

module.exports = router;