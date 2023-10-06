const {createPool} = require("mysql");
const db = require("mysql2");

const pool = db.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
}).promise(); 

module.exports = pool;