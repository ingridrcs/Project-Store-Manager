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

const updateSalesService = async (id, productId, quantity) => {
   const result = await salesModel.update(id, productId, quantity);
   // console.log(result);
return result;
};

module.exports = { getSaleService, addSalesService, updateSalesService };