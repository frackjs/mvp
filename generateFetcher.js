const cache = {}

const kebab = (camel) => {
  if (camel.toLowerCase() === camel) {
    return camel
  }

  if (cache[camel] !== undefined) {
    return cache[camel]
  }

  const letters = camel.split('')
  const out = []
  letters.forEach((x) => {
    if (x.toLowerCase() === x) { // lower
      out.push(x)
    } else { // upper
      out.push('-')
      out.push(x.toLowerCase())
    }
  })
  return out.join('')
}

const httpType = 'get'

module.exports = function generateFetcher(objName, method) {
  const pathVars = method.args.map((arg) => (
    arg !== 'params' ? ` + '/' + ${arg}` : ''
  )).join('')

  let out = ''

  out += `${kebab(objName)}.${method.name} = function(${method.args.join(', ')}) {\n`
  out += `  const path = '/${kebab(objName)}/${kebab(method.name)}'${pathVars};\n`
  out += `  return axios.${httpType}(path`
  out += method.args[method.args.length - 1] === 'params' ? ', params' : ''
  out += ');\n'
  out += `};`

  return out
}

// const out = generateFetcher('products', { name: 'update', args: ['id', 'params'] })

// console.log(out)
