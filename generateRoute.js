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

const renderEachArg = (arg) => `const ${arg} = req.params['${arg}']`

const generateRoute = (objName, method) => {
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

  let out = ''
  out += `  app.${verb}('/${kebab(objName)}/${kebab(method.name)}${method.args.filter((x) => x !== 'params').map((x) => `/:${x}`).join()}', (req, res) => {\n`
  out += `    ${method.args.map(renderEachArg).join(`\n    `)}\n`
  out += `    const data = ${objName}.${method.name}(\n`
  out += `      ${method.args.join(`,\n      `)}\n`
  out += `    )\n`
  out += `    res.json(data)\n`
  out += `  });`
  return out
}

module.exports = generateRoute
