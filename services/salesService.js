const salesModel = require('../models/salesModel');

const getSaleService = (id = null) => {
  if (id) {
    return salesModel.getById(id);
  }
  return salesModel.getAll();
};

const addSalesService = async (date, productId, quantity) => {
   const newProduct = await salesModel.add(date, productId, quantity);
   return newProduct;
};

module.exports = { getSaleService, addSalesService };