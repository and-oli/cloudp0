const mysql = require('mysql');

const con = mysql.createConnection({
  host: "remotemysql.com",
  user: "sRrTxvGG1F",
  password: "abZReTSenk",
  database: "sRrTxvGG1F"
});

module.exports = con;