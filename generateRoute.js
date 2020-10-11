const __ = "  ";

const generateRoute = (objName, method) => (
  __+"app.get('/"+objName+"/"+method.name+"/:id', (req, res) => {"+'\n'+
  __+__+method.args.map(arg => "const "+arg+" = req.params['"+arg+"']").join("\n"+__+__)+"\n"+
  __+__+"const data = "+objName+"."+method.name+"("+'\n'+
  __+__+__+method.args.map(x => x + ",").join("\n"+__+__+__)+"\n"+
  __+__+")"+'\n'+
  __+__+"res.json(data)"+'\n'+
  __+"});"
)

module.exports = generateRoute