const mysql = require('mysql');

function createConnection(){
  const connection = mysql.createConnection({
    host:'192.168.0.102',
    port:'3306',
    user:'root',
    password:'root',
    database:'my_blog'
  })
  return connection;
}

module.exports.createConnection = createConnection;