const generateRoute = require('./generateRoute')
const fs = require('fs');

const config = { 
  serverDir: 'server',
  clientSrc: 'client/src'
}

const ast = {
  name: 'products', 
  methods: [{
    name: 'getOne',
    args: ['id'],
  },{
    name: 'getMany',
    args: ['params'],
  },{
    name: 'create',
    args: ['params'],
  },{
    name: 'update',
    args: ['id', 'params'],
  },{
    name: 'delete',
    args: ['id'],
  }]
}

function generateRoutes(ast){
  return ast.methods.map(method => {
    return generateRoute(ast.name, method)
  }).join("\n\n")
}

function generateRoutesFile(ast){
  return "const products = require('../server/products')"+'\n\n'+
  "module.exports = function productsRoutes(app){"+'\n\n'+
  generateRoutes(ast)+'\n'+
  '}'
}

const dname = config.serverDir.concat('/routes')
const fname = ast.name+'Routes.js'

let prevD = ''
dname.split('/').forEach(d => {
  console.log(prevD)
  if(prevD!==''){
    d = prevD + '/' + d
  }
  console.log('try -- ' + d)
  if (!fs.existsSync(d)){
    fs.mkdirSync(d);
    prevD = d
  }
})

fs.writeFile([dname,fname].join('/'), generateRoutesFile(ast), function(err) {
  if(err) {
    console.log(err)
  }
  else{
    console.log("Generated -- " + [dname,fname].join('/'))
  }
})