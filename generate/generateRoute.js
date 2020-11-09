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

function renderTabIf(args) {
  return args.length === 0 ? '' : '    '
}

function renderNewLineIf(args) {
  return args.length === 0 ? '' : '\n'
}

function renderEachArg(arg, verb) {
  if (arg !== 'params') {
    return `const ${arg} = !isNaN(req.params.${arg}) ? parseInt(req.params.${arg}) : req.params.${arg};`
  }
  return `const params = req.${verb === 'get' ? 'query' : 'body'}`
}

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
  out += renderTabIf(method.args)
  out += `${method.args.map(renderEachArg).join(`\n    `)}`
  out += renderNewLineIf(method.args, verb)
  out += `    const data = ${objName}.${method.name}(${method.args.join(`, `)});\n`
  out += `    res.json(data);\n`
  out += `  });`
  return out
}

module.exports = generateRoute
