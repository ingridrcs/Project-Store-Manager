const products = require('../services/productsService');

const getAllItens = async (_req, res) => {
  console.log('cheguei');
  try {
    const response = await products.getProductService();
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Product not found' });
  }
};

const getByIdItens = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await products.getProductService(id);
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getAllItens, getByIdItens };