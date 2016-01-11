//libs 
exports.obj_to_sql = function(data) {
  var names = [];
  var values = [];
  for (var i in data) {
    var v = data[i];
    switch (typeof v) {
      case 'boolean':
        names.push(i);
        values.push(Number(v));
        break;
      case 'number':
        names.push(i);
        values.push(v);
        break;
      case 'string':
        //if (v) {
        names.push(i);
        values.push("'" + v + "'");
        //}
        break;
      case 'object':
        if (v) {
          names.push(i);
          values.push("'" + JSON.stringify(v) + "'");
          break;
        } else {
          names.push(i);
          values.push("NULL");
          break;
        }
    }
  }
  return {
    name: names,
    value: values
  }
}

exports.obj_to_insert_into_sql = function(Connection, list) {
  var name = '';
  var valueArr = [];

  for (var i = 0, len = list.length; i < len; i++) {



    var sql = obj_to_sql(list[i]);

    if (!name) {
      name = sql.name.join(',');
    }
    valueArr.push('(' + sql.value.join(',') + ')');
  }
  return 'INSERT ' + Connection + ' (' + name + ') VALUES ' + valueArr.join(',');
}



exports.obj_to_insert_sql = function(Connection, data) {
  var sql = obj_to_sql(data);
  return 'INSERT ' + Connection + ' (' + sql.name.join(',') + ') VALUES (' + sql.value.join(',') + ')';
}

exports.__first_serialize = function(data) {
  var arr = [];
  for (var i = 0, len = data.name.length; i < len; i++) {
    arr.push(data.name[i] + '=' + data.value[i]);
  }
  return arr;
}

exports._serialize = function(data) {
  var arr = [];
  for (var i = 0, len = data.name.length; i < len; i++) {
    arr.push(data.name[i] + '=' + data.value[i]);
  }
  return arr.join(',');
}



exports.obj_to_update_sql = function(Connection, data, primary_key) {
  var primary_value = data[primary_key];
  delete(data[primary_key]);
  var sql = obj_to_sql(data);
  data[primary_key] = primary_value;
  return 'UPDATE ' + Connection + ' SET ' + _serialize(sql) + ' WHERE ' + primary_key + '=\'' + primary_value + '\'';
}

exports.obj_to_select_sql = function(Connection, data, primary_key) {
  var primary_value, sql, where;
  if (typeof data === 'string') {
    primary_value = data;
    sql = '*';
  } else {
    primary_value = data[primary_key];
    sql = obj_to_sql(data);
    sql = sql.name.join(",");
  }
  where = primary_key ? ' WHERE ' + primary_key + '=\'' + primary_value + '\'' : '';
  return 'SELECT ' + sql + ' FROM ' + Connection + where;
}

exports.index_serialize = function(data, arr) {
  var _data = {};
  for (var i = 0, len = arr.length; i < len; i++) {
    var k = arr[i];
    _data[k] = data[k];
  }
  _data = obj_to_sql(_data);
  var index_sql = __first_serialize(_data);
  return index_sql.join(' AND ');
}

exports.obj_to_select_sql_by_index = function(Connection, data, index_keys) {
  var index_sql = index_serialize(data, index_keys);
  var pre_sql = Object.keys(data).join(",");
  var where = ' WHERE ' + index_sql;
  return 'SELECT ' + pre_sql + ' FROM ' + Connection + where;
}