const __ = "  ";

let cache = {}

const kebab = (camel) => {
  if(camel.toLowerCase()===camel){
    return camel
  }
  if(cache[camel] !== undefined){
    return cache[camel]
  }
  const letters = camel.split('')
  let out = []
  letters.forEach(x => {
    if(x.toLowerCase() === x) { // lower
      out.push(x)
    }
    else { // upper
      out.push('-')
      out.push(x.toLowerCase())
    }
  })
  return out.join('')
}

const generateRoute = (objName, method) => (
  __+"app.get('/"+kebab(objName)+"/"+kebab(method.name)+"/:id', (req, res) => {"+'\n'+
  __+__+method.args.map(arg => "const "+arg+" = req.params['"+arg+"']").join("\n"+__+__)+"\n"+
  __+__+"const data = "+objName+"."+method.name+"("+'\n'+
  __+__+__+method.args.map(x => x + ",").join("\n"+__+__+__)+"\n"+
  __+__+")"+'\n'+
  __+__+"res.json(data)"+'\n'+
  __+"});"
)

module.exports = generateRoute