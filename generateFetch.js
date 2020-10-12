const { METHODS } = require("http");

const __ = "  ";
const ____=__+__;
const ______=__+__+__;

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

const httpType = 'get'

const generateFetch = (objName, method) => {

  const pathVars = method.args.map(arg => {
    return arg!=='params' ? " + '/' + " + arg : ''
  }).join('')

  return (
__+kebab(objName)+'.'+method.name+' = function('+method.args.join(', ')+'){' +'\n'+
____+"const path = '/" + kebab(objName) + "/" + kebab(method.name) + "'" + pathVars + ";" +'\n'+
____+"return axios."+httpType+"(path" +
        ((method.args[method.args.length-1]==='params') ? ', params' : '') +
      ');' +'\n'+
__+'};' +'\n'
  )
}

const out = generateFetch('products', {name: 'update', args: ['id','params']})
console.log(out)