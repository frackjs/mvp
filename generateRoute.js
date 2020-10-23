const xx = "  "

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

const generateRoute = (objName, method) => (
  `  app.get('/${kebab(objName)}/${kebab(method.name)}${method.args.filter((x) => x !== 'params').map((x) => `/:${x}`).join()}', (req, res) => {\n${
    xx}  ${method.args.map(renderEachArg).join(`\n    `)}\n${
    xx}  const data = ${objName}.${method.name}(\n${
    xx}    ${method.args.join(`,\n      `)}\n${
    xx}  )\n${
    xx}  res.json(data)\n${
    xx}});`
)

module.exports = generateRoute
