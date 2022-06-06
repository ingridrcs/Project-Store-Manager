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
   const verify = await productsModel.getById(id);
   // console.log(verify);
   // ver se isso está correto
   if (!verify.id) {
      return null;
   }
   const result = await productsModel.update(id, name, quantity);
   return result;
};

const removeProductsService = async (id) => {
   const result = await productsModel.getById(id);
   if (!result) {
      return null;
   }
      const remove = await productsModel.remove(id);
      return remove;
};

module.exports = { 
   getProductService, addProductService, updateProductService, removeProductsService };