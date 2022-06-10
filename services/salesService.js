const salesModel = require('../models/salesModel');

const getSaleService = (id = null) => {
  if (id) {
    return salesModel.getById(id);
  }
  return salesModel.getAll();
};

const addSalesService = async (sales) => {
  const getId = await salesModel.addSales();
  console.log('getId', getId);

  const allSales = sales.map(async ({ productId, quantity }) => {
    const newSale = await salesModel.addSalesProduct(getId, productId, quantity);
    // const { productId, quantity } = newProduct;
return newSale;
  });
  await Promise.all(allSales);
  const createSale = {
    id: getId,
    itemsSold: sales,
  };
  return createSale;
};

const updateSalesService = async (id, productId, quantity) => {
  const result = await salesModel.update(id, productId, quantity);
  // console.log(result);
  return result;
};

module.exports = { getSaleService, addSalesService, updateSalesService };
// Source: Colaboração dos instrutores durante as monitorias