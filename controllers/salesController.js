const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  try {
    const response = await salesService.getAll();
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'Sale not found' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await salesService.getById(id);
    return res.status(200).json(response); 
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'Sale not found' });
  }
};

module.exports = { getAll, getById };