const sales = require('../services/salesService');

const getAllItens = async (_req, res) => {
  try {
    const [rows] = await sales.getSaleService();
    return res.status(200).json(rows); 
  } catch (error) {
    // console.log(error);
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
// const { id, productId, quantity } = req.body;
const rows = await sales.addSalesService(req.body);
// console.log(rows);
return res.status(201).json(rows);
};

const updateItens = async (req, res) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body; 
  const update = await sales.updateSalesService(id, productId, quantity);
  // console.log(update);
    return res.status(200).json(update);
};

const removeItens = async (req, res) => {
    const { id } = req.params;
    const result = await sales.removeSalesService(id);
    if (result === null) {
    return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(204).end();
};

module.exports = { getAllItens, getByIdItens, addItens, updateItens, removeItens };