const products = require('../services/productsService');

const getAllItens = async (_req, res) => {
  try {
    const [rows] = await products.getProductService();
    console.log(rows);
    return res.status(200).json(rows); 
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const getByIdItens = async (req, res) => {
    const { id } = req.params;
    const [rows] = await products.getProductService(id);
    if (rows.length !== 0) {
    return res.status(200).json(rows[0]); 
    }
    return res.status(404).json({ message: 'Product not found' });
};

module.exports = { getAllItens, getByIdItens };