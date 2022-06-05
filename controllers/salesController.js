const sales = require('../services/salesService');

const getAllItens = async (_req, res) => {
  try {
    const [rows] = await sales.getSaleService();
    return res.status(200).json(rows); 
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: 'Sale not found' });
  }
};

const getByIdItens = async (req, res) => {
    const { id } = req.params;
    const [rows] = await sales.getSaleService(id);
    if (rows.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(rows);
};

const addItens = async (req, res) => {
const { date, productId, quantity } = req.body;
const rows = await sales.addProductService(date, productId, quantity);
  if (!quantity) {
    return res.status(409).json({ message: 'Product already exists' });
  }
   if (quantity >= 0) {
    return res.status(409).json({ message: 'Product already exists' });
  }
    return res.status(201).json(rows);
};

const updateItens = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body; 
  const update = await sales.updateSalesService(id, productId, quantity);
    if (update) {
    return res.status(200).json(update);
  }
    return res.status(404).json({ message: 'Product not found' });
};

module.exports = { getAllItens, getByIdItens, addItens, updateItens };