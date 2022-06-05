const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

const salesValidation = require('../middlewares/salesMiddleware');

router.get('/sales', salesController.getAllItens);
router.get('/sales/:id', salesController.getByIdItens);
router.post('/sales', salesValidation, salesController.addItens);
router.put('/sales/:id', salesController.updateItens);
module.exports = router;