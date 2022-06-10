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

const addSales = async () => {
  const [rows] = await connection.execute('INSERT INTO StoreManager.sales (date) VALUES (NOW());');
  return rows.insertId;
};

const addSalesProduct = async (id, productId, quantity) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      [id, productId, quantity],
    );
    const add = {
      productId,
      quantity,
    };
  return add;
};

const update = async (id, productId, quantity) => {
  // console.log(id, productId, quantity);
  await connection
  .execute(
'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?;',
  [quantity, productId, id],
  );
     const sale = {
     saleId: id,
     itemUpdated: [
       {
         productId,
         quantity,
       },
     ],
   };
   return sale;
};

const removeSales = async (id) => {
  const [result] = await connection.execute('DELETE FROM StoreManager.sales WHERE id=?', [id]);
  return result;
};

const removeSalesProducts = async (saleId) => {
  const [result] = await connection
  .execute('DELETE FROM StoreManager.sales_products WHERE sale_id=?', [saleId]);
  return result;
};
module.exports = { getAll,
   getById, 
   addSales, 
   addSalesProduct, 
   update, 
   removeSales, 
   removeSalesProducts };