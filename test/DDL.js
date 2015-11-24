var mysql = require('mysql');
var ddl = require('../libs/DDL');
var conf = require('./conf');
var connection = mysql.createConnection(conf);
connection.connect();
var DB_NAME = 'js2sql_test';
connection.config.database = DB_NAME;
console.log(connection)



var sql = ddl.createTable('table_test',{id:'int'});
connection.query(sql, function() {
  console.log('arguments', arguments);
});

/*var sql = ddl.createDb(DB_NAME);
connection.query(sql, function() {
  console.log('arguments', arguments);
});*/
