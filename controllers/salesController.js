const sales = require('../services/salesService');

const getAllItens = async (_req, res) => {
  try {
    const response = await sales.getSaleService();
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'Sale not found' });
  }
};

const getByIdItens = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await sales.getSaleService(id);
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'Sale not found' });
  }
};

module.exports = { getAllItens, getByIdItens };