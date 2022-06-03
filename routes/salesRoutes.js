const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);

module.exports = router;