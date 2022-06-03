const productsModel = require('../models/productsModel');

const getProductService = (id = null) => {
  if (id) {
    return productsModel.getById(id);
  }
  return productsModel.getAll();
};

module.exports = getProductService;