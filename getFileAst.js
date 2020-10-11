const fs = require('fs')

function getFileAst(filename, cb){

  fs.readFile(filename, 'utf8', function(err, data){

    const model = filename.split('/').pop().split('.').shift()
    const lines = data.split("\n")

    const ast = {
      name: model,
      methods: [],
    } 

    lines.forEach(l => {
      const clean = l.trim()
      const match = matchMethodLine(clean, model)
      if(match !== ''){
        const methodName = clean.split(model + '.')[1].split('=')[0].trim()
        const args = clean.split('function(')[1].split(')')[0].split(',').map(x => x.trim())
        ast.methods.push({ name: methodName, args: args })
      }
    });
    
    cb(ast)
  })
}

function matchMethodLine(str, objName){
  const re= new RegExp('^'+objName+'\\.[A-Za-z0-9|_$]+\\s*\\=(?!=)\\s*.+')
  const r = str.match(re)
  return r === null ? '' : r[0]
}

getFileAst('./test-files/products.js', o => console.log(o))

/*
---------------
SAMPLE FILE AST
---------------
{
  name: 'products', 
  methods: [{
    name: 'getOne',
    args: ['id'],
  },{
    name: 'getOne',
    args: ['params'],
  },{
    name: 'getOne',
    args: ['params'],
  },{
    name: 'getOne',
    args: ['id', 'params'],
  },{
    name: 'getOne',
    args: ['id'],
  }]
}
  */