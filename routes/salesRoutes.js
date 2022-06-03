const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.get('/sales', salesController.getAllItens);
router.get('/sales/:id', salesController.getByIdItens);

module.exports = router;