const connection = require('../db/connection');

const getAll = async () => {
  const query = `SELECT P.sale_id AS saleId, S.date,
  P.product_id AS productId,
  P.quantity FROM StoreManager.sales AS S 
  INNER JOIN StoreManager.sales_products AS P 
  ON S.id = P.sale_id;`;
  const result = await connection.execute(query);
  return result;
};

const getById = async (id) => {
    const query = `SELECT S.date,
  P.product_id AS productId,
  P.quantity FROM StoreManager.sales AS S 
  INNER JOIN StoreManager.sales_products AS P 
  ON S.id = P.sale_id WHERE id = ?;`;
  const result = await connection.execute(query, [id]);
  return result;
};
module.exports = { getAll, getById };