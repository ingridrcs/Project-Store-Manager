const express = require('express');

const router = express.Router();

const productsModel = require('../models/productsModel');

router.get('/products', async (req, res) => {
  try {
    const response = await productsModel.getAll();
    res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Erro interno' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsModel.getById(id);
    res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;