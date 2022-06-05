const connection = require('../db/connection');

const getAll = async () => {
  const result = await connection.execute('SELECT * FROM StoreManager.products;');
  return result;
};

const getById = async (id) => {
  const resul = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  return resul;
};

const getByName = async (name) => {
    const [rows] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE name = ?', [name]);
    return rows;
};

const add = async (name, quantity) => {
  const [row] = await connection
  .execute('INSERT INTO StoreManager.products (name,quantity) VALUES (?, ?)', [name, quantity]);
  const result = {
    id: row.insertId,
    name,
    quantity,
  };
  return result;
};

const update = async (id, name, quantity) => {
  const [result] = await connection
  .execute('UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?', [name, quantity, id]);
  console.log(result);
  return result.affectedRows;
};

module.exports = { getAll, getById, add, getByName, update };