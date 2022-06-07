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

const add = async (date, productId, quantity) => {
  const [row] = await connection
  .execute(
    'INSERT INTO StoreManager.sales (date,productId, quantity) VALUES (?, ?, ?)',
    [date, productId, quantity],
    );
  const result = {
    saleid: row.insertId,
    productId,
    quantity,
  };
  return result;
};

const update = async (productId, quantity, saleId) => {
  const [result] = await connection
  .execute('UPDATE StoreManager.sales_products SET product_id =? quantity = ? WHERE sale_id = ?',
  [saleId, productId, quantity]);
  console.log(result);
  return result.affectedRows;
};
module.exports = { getAll, getById, add, update };