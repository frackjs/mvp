const fs = require('fs')

const generateRoute = require('./generateRoute')
const getFileAst = require('./getFileAst')
const { generateFile, generateItems } = require('./util')

function buildContent(ast) {
  return `const products = require('../actions/products');\n\n${
    ''}module.exports = function productsRoutes(app){\n${
    generateItems(ast, generateRoute)}\n};`
}
/*
function insertRouteImports(actionsDir, name) {
  fs.readFile('./server.js', 'utf8', (err, data) => {
    const file = `./${actionsDir}Routes/${name}Routes.js`
    const importLine = `const ${name}Routes = require('${file}')`
    const useLine = `${name}Routes(app)`
    const str = data.replaceAll(`${importLine}\n`, '').replaceAll(`${useLine}\n`, '')
    fs.writeFile('./server.js', str.replace('// import routes', `// import routes\n${importLine}`).replace('// use routes', `// use routes\n${useLine}`), () => {})
  })
}
*/

module.exports = function generateRoutesFile(actionsDir, name) {
  getFileAst(`./${actionsDir}/${name}.js`, (ast) => {
    generateFile(ast, `${actionsDir}Routes`, `${name}Routes.js`, buildContent(ast))
    // insertRouteImports(actionsDir, name)
  })
}
