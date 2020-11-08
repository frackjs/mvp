const generateRoute = require('./generateRoute')
const getFileAst = require('./getFileAst')
const { generateFile, generateItems } = require('./util')

function buildContent(ast) {
  return `const products = require('../actions/products');\n\n${
    ''}module.exports = function productsRoutes(app){\n\n${
    generateItems(ast, generateRoute)}\n};`
}

module.exports = function generateRoutesFile(actionsDir) {
  getFileAst(`./${actionsDir}/products.js`, (ast) => {
    generateFile(ast, `${actionsDir}Routes`, 'productsRoutes.js', buildContent(ast))
  })
}
