const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

// Não está funcinando
// const { salesProductIdValidation, salesQuantityValidation } = require('../middlewares/salesMiddleware');

router.get('/sales', salesController.getAllItens);
router.get('/sales/:id', salesController.getByIdItens);
router.post('/sales', salesController.addItens);
router
.put('/sales/:id', salesController.updateItens);
router.delete('/sales/:id', salesController.removeItens);
module.exports = router;