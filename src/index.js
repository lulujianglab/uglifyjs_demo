var jsp = require('./uglify-js').parser

var pro = require('./uglify-js').uglify  
  
var origCode = "var abc = function(){ var str = '单个文件读取压缩成功'; return str;}"

var ast = jsp.parse(origCode) 

ast = pro.ast_mangle(ast)  
ast = pro.ast_squeeze(ast)

var finalCode = pro.gen_code(ast)

console.log(finalCode)
