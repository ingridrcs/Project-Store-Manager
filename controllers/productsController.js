const express = require('express');

const router = express.Router();
const productsService = require('../services/productsService');

router.get('/products', async (req, res) => {
  try {
    const [rows] = await productsService.getAll();
    return res.status(200).json(rows); 
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Erro interno' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsService.getById(id);
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Product not found' });
  }
});