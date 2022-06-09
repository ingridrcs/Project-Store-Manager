const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

const 
{ salesProductIdValidation, salesQuantityValidation } = require('../middlewares/salesMiddleware');

router.get('/sales', salesController.getAllItens);
router.get('/sales/:id', salesController.getByIdItens);
router.post('/sales', salesProductIdValidation, salesQuantityValidation, salesController.addItens);
router
.put('/sales/:id', salesQuantityValidation, salesProductIdValidation, salesController.updateItens);

module.exports = router;