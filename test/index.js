var js2sql = require('../index');


console.log('1.搜索所有：');
console.log(js2sql.select('Connection'));
console.log('2.搜索部分:');
console.log(js2sql.select('Connection', {name:'a',value:'b'}));
console.log('3-0.主键搜索所有：');
console.log(js2sql.select('Connection', 'hello', 'name'));
console.log('3-1.主键搜索部分：');
console.log(js2sql.select('Connection', {name:'hello',value:'b'}, 'name'));