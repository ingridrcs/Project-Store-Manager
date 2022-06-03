const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/products', productsController.getAllItens);
router.get('/products/:id', productsController.getByIdItens);
// router.post('/products', productsController);

module.exports = router;