var util = require('./util');

exports.createDb = function(name) {
  return 'CREATE DATABASE ' + name;
}

exports.dropDb = function(name) {
  return 'DROP DATABASE ' + name;
}

exports.createTable = function(Connection, column) {
  Connection = 'CREATE TABLE ' + Connection + ' ';
  column = util.obj_to_create_table(column);
  column = '(' + column.join(',') + ')';
  return  Connection + column;
}