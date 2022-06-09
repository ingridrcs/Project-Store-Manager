const salesModel = require('../models/salesModel');

const getSaleService = (id = null) => {
  if (id) {
    return salesModel.getById(id);
  }
  return salesModel.getAll();
};

const addSalesService = async (sales) => {
  const getId = await salesModel.addSales();
   const newProduct = await salesModel.addSalesProduct(getId, sales);
   const add = {
     saleId: getId,
     itemSold: [...newProduct],
   };
   return add;
};

const updateSalesService = async (id, productId, quantity) => {
   const result = await salesModel.update(id, productId, quantity);
   // console.log(result);
return result;
};

module.exports = { getSaleService, addSalesService, updateSalesService };