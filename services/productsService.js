const productsModel = require('../models/productsModel');

const getProductService = (id = null) => {
  if (id) {
    return productsModel.getById(id);
  }
  return productsModel.getAll();
};

const addProductService = async (name, quantity) => {
   const rows = await productsModel.getByName(name);
   if (rows.length !== 0) {
      return null;
   }
   const newProduct = await productsModel.add(name, quantity);
   return newProduct;
};

const updateProductService = async (id, name, quantity) => {
   const result = await productsModel.update(id, name, quantity);
   return result;
};

module.exports = { getProductService, addProductService, updateProductService };