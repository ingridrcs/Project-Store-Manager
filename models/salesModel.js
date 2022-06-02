const connection = require('../db/connection');

// Juntar as duas tabelas de sales?

const getAll = async () => {
  const result = await connection.execute('SELECT * FROM StoreManager.sales');
  return result;
};

const getById = async (id) => {
  const result = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
  return result;
};

// SELECT P.sale_id AS saleId, S.date, P.product_id AS productId, P.quantity FROM StoreManager.sales AS S 
// INNER JOIN StoreManager.sales_products AS P
// ON S.id = P.sale_id;

// SELECT S.date, P.product_id AS productId, P.quantity FROM StoreManager.sales AS S 
// INNER JOIN StoreManager.sales_products AS P
// ON S.id = P.sale_id;
module.exports = { getAll, getById };