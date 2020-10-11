const ast = {
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

const __ = "  ";

const generateRoute = (objName, method) => (
  "app.get('/"+objName+"/"+method.name+"/:id', (req, res) => {"+'\n'+
    __+method.args.map(arg => "const "+arg+" = req.params['"+arg+"']" + '\n')+
    __+"const data = "+objName+"."+method.name+"("+'\n'+
    __+__+method.args.map(x => x + "," + '\n')+
    __+")"+'\n'+
    __+"res.json(data)"+'\n'+
  "});"
)

console.log( generateRoute(ast.name, ast.methods[0]) )