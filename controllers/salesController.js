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

module.exports = { getAllItens, getByIdItens };