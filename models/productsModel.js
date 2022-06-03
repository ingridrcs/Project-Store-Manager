const connection = require('../db/connection');

const getAll = async () => {
  const result = await connection.execute('SELECT * FROM StoreManager.products;');
  return result;
};

const getById = async (id) => {
  const resul = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  return resul;
};

module.exports = { getAll, getById };