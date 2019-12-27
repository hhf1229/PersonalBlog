const mysql = require('mysql');

function createConnection(){
  const connection = mysql.createConnection({
    host:'39.107.138.218',
    port:'3306',
    user:'root',
    password:'root',
    database:'my_blog'
  })
  return connection;
}

module.exports.createConnection = createConnection;