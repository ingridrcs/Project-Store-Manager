const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

const validationProduct = require('../middlewares/productMiddleware');

router.get('/products', productsController.getAllItens);
router.get('/products/:id', productsController.getByIdItens);
router.post('/products', validationProduct, productsController.addItens);
router.put('/products/:id', productsController.updateItens);
router.delete('/products/:id', productsController.removeItens);

module.exports = router;