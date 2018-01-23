// 取fs模块（node的文件模块）然后取UglifyJS的两个模块 进行UglifyJS压缩
var fs = require('fs')
var jsp = require('../uglify-js').parser
var pro = require('../uglify-js').uglify

// 单个文件读取压缩

// function buildOne (fileIn, fileOut) {
//   var origCode = fs.readFileSync(fileIn, 'utf8')
//   var ast = jsp.parse(origCode)  
//   ast = pro.ast_mangle(ast)  
//   ast = pro.ast_squeeze(ast)  

//   var finalCode = pro.gen_code(ast)

//   fs.writeFileSync(fileOut, finalCode, 'utf8')
// }

// buildOne('src/index.js', 'build/index-min.js')

// 批量读取文件压缩

function buildAll (fileIn, fileOut) {
  if (fileIn.length > 0) {
    var finalCode = []
    var origCode = ''
    var ast = ''

    for (var i = 0, len = fileIn.length; i < len; i++) {
      origCode = fs.readFileSync(fileIn[i], 'utf8')
      ast = jsp.parse(origCode)
      ast = pro.ast_mangle(ast)
      ast = pro.ast_squeeze(ast)

      finalCode.push(pro.gen_code(ast), ';')
    }
  }
  fs.writeFileSync(fileOut, finalCode, 'utf8')
}

buildAll(['src/index.js', 'src/compile.js'], 'build/build.min.js')
