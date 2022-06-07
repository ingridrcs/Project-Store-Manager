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

const addItens = async (req, res) => {
const { name, quantity } = req.body;
const rows = await products.addProductService(name, quantity);
  if (rows) {
    return res.status(201).json(rows);
  }
    return res.status(409).json({ message: 'Product already exists' });
};

const updateItens = async (req, res) => {
const { name, quantity } = req.body;
const { id } = req.params;
const rows = await products.updateProductService(id, name, quantity);
// console.log(rows);
  if (!rows) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const [result] = await products.getProductService(id);
  // console.log(result);
    return res.status(200).json(result[0]);
};

const removeItens = async (req, res) => {
    const { id } = req.params;
    const result = await products.removeProductsService(id);
    if (result === null) {
    return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(204).end();
};
module.exports = { getAllItens, getByIdItens, addItens, updateItens, removeItens };