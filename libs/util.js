exports.obj_to_sql = function obj_to_sql(obj) {
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

exports.obj_to_create_table = function(obj){
  var keys = Object.keys(obj);
  for(var i = 0 , len = keys.length; i < len; i++){
    var v = keys[i],o_v = obj[v];
    if(typeof o_v === 'string'){
      keys[i] = v + ' ' + o_v;
    }else{

    }
  }

  return keys;

}

exports.param_or = function(arr , key){
  return key+'="' + arr.join('"||'+ key+'="') + '"';
}