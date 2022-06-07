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

const add = async (id, productId, quantity) => {
  const [row] = await connection
  .execute(
    'INSERT INTO StoreManager.sales_products (saleId, productId, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
    );
  const result = {
    id: row.insertId,
    itemSold: [
      {
        productId,
        quantity,
      },
    ],
  };
  return result;
};

const update = async (saleId, productId, quantity) => {
  console.log(saleId, productId, quantity);
  await connection
  .execute(
'UPDATE StoreManager.sales_products SET sale_id  = ? WHERE product_id = ? AND quantity = ?;',
  [saleId, productId, quantity],
  );
     const sale = {
     saleId,
     itemUpdated: [
       {
         productId,
         quantity,
       },
     ],
   };
   return sale;
};
module.exports = { getAll, getById, add, update };