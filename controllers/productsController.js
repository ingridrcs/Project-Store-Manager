const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  try {
    const response = await productsService.getAll();
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Product not found' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productsService.getAll(id);
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getAll, getById };