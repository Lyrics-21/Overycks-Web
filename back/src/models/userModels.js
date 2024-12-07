const db = require('../config/database');

//Crear Usuario
const insertUser = async(name, email, hash) =>
{
   const [result] = await db.query(`INSERT INTO usuarios (name, email, password) VALUES(?, ?, ?)`,
   [name, email, hash]);
   return result;
};

const checkUser = async(name, email) =>
{
   const [result] = await db.query('SELECT id FROM usuarios WHERE name = ? or email = ?',
   [name, email]);
   return result;
};

const findUser = async(name) =>
{
   const [result] = await db.query('SELECT id, name, password FROM usuarios WHERE name = ?',
   [name]);
   return result;
}

const deleteUser = async(userID) =>
{
   const [result] = await db.query('DELETE FROM usuarios WHERE id = ?',
   [userID]);
   return result;
}

module.exports = 
{
   insertUser,
   findUser,
   checkUser,
   deleteUser
};

