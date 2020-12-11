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

module.exports = function generateFetcher(objName, method) {
  const pathVars = method.args.map((arg) => (
    arg !== 'params' ? ` + '/' + ${arg}` : ''
  )).join('')

  let out = ''

  let verb = 'get'
  if (method.name.indexOf('create') === 0) {
    verb = 'post'
  }
  if (method.name.indexOf('update') === 0) {
    verb = 'put'
  }
  if (method.name.indexOf('delete') === 0) {
    verb = 'delete'
  }

  out += `${kebab(objName)}.${method.name} = function(${method.args.join(', ')}) {\n`
  out += `  const path = '/${kebab(objName)}/${kebab(method.name)}'${pathVars};\n`
  out += `  return ${verb}Data(path`
  out += method.args[method.args.length - 1] === 'params' ? ', params' : ''
  out += ');\n'
  out += `};`

  return out
}

// const out = generateFetcher('products', { name: 'update', args: ['id', 'params'] })

// console.log(out)
