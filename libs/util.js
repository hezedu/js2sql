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
    var k = keys[i],v = obj[k];
    if(typeof v === 'string'){
      keys[i] = k + ' ' + v;
    }else{
      keys[i] = k + ' ' + v.type + ' ' + (v.constraint || '');
    }
  }

  return keys;

}

exports.param_or = function(arr , key){
  return key+'="' + arr.join('"||'+ key+'="') + '"';
}