const salesModel = require('../models/salesModel');

const getSaleService = (id = null) => {
  if (id) {
    return salesModel.getById(id);
  }
  return salesModel.getAll();
};

module.exports = getSaleService;