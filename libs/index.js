var util = require('./util');
//DDL
exports.createDb = function(name) {
  return 'CREATE DATABASE' + name;
}

exports.dropDb = function(name) {
  return 'DROP DATABASE' + name;
}

//DML
exports.select = function select(Connection, schema, param){
  var sql = "";
  switch(arguments.length){
    case 1:
    sql = 'SELECT * FROM ' + Connection;
    break;
    case 2:
    sql = Object.keys(schema).join(",");
    sql = 'SELECT ' + sql + ' FROM ' + Connection;
    break;
    case 3:
    if(typeof schema === 'string'){
      if(typeof param ==='string'){
        sql = select(Connection);
        sql = sql + ' WHERE ' + param + '="' + schema +'"';
      }else{
        
      }
    }else{
      if(typeof param ==='string'){
        sql = select(Connection, schema);
        //sql = util.param_or(Object.keys(schema), schema[param]);
        sql = sql + ' WHERE ' + param + '="' + schema[param] +'"';
      }else{
        
      }
    }
    break;
  }
  return sql;
}