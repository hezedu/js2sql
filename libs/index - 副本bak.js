function obj_to_sql(obj) {
  var names = [];
  var values = [];
  for (var i in obj) {
    var v = obj[i];
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
        if (v) {
          names.push(i);
          values.push("'" + v + "'");
        }
        break;
      case 'object':
        if (v) {
          names.push(i);
          values.push("'" + JSON.stringify(v) + "'");
          break;
        }
    }
  }
  return {
    name: names,
    value: values
  }
}

function update_serialize(data) {
  var arr = [];
  for (var i = 0, len = data.name.length; i < len; i++) {
    arr.push(data.name[i] + '=' + data.value[i]);
  }
  return arr.join(',');
}

function arr_to_sql(arr, primary_key) {
  var result = obj_to_sql(arr[0]);
  var condition = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    condition.push(arr[i][primary_key]);
  }
  result.condition = condition;
  return result;
}

function num_or_str(v){
  if(typeof v === 'number'){
    return v;
  }else{
    return "'" + v +"'";
  }
}

function obj_to_select_sql_by_primary(Connection, data, primary_key) {
  var primary_value, sql, where;
  if (typeof data === 'string') {
    primary_value = data;
    sql = '*';
  } else {
    primary_value = data[primary_key];
    sql = obj_to_sql(data);
    sql = sql.name.join(",");
  }
  where = primary_key ? ' WHERE ' + primary_key + '=\'' + num_or_str(primary_value) + '\'' : '';
  return 'SELECT ' + sql + ' FROM ' + Connection + where;
}


function more_primary_serialize(primary, data) {
  var arr = [];
  for (var i = 0, len = data.length; i < len; i++) {
    arr.push(primary + '=' + num_or_str(data[i]));
  }
  return arr.join('||');
}

function arr_to_select_sql_by_primary(Connection, data, primary_key) {
  var sql = arr_to_sql(data);

  where = primary_key ? ' WHERE ' + primary_key + '=\'' + primary_value + '\'' : '';
  return 'SELECT ' + sql + ' FROM ' + Connection + where;


}

function obj_to_insert_sql(Connection, data) {
  var sql = obj_to_sql(data);
  return 'INSERT ' + Connection + ' (' + sql.name.join(',') + ') VALUES (' + sql.value.join(',') + ')';
}



function obj_to_update_sql(Connection, data, primary_key) {
  var primary_value = data[primary_key];
  delete(data[primary_key]);
  var sql = obj_to_sql(data);
  data[primary_key] = primary_value;
  return 'UPDATE ' + Connection + ' SET ' + update_serialize(sql) + ' WHERE ' + primary_key + '=\'' + primary_value + '\'';
}