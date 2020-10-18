const generateRoute = require('./generateRoute')
const getFileAst = require('./getFileAst')
const generateFile = require('./generateFile')

function generateRoutes(ast) {
  return ast.methods.map((method) => generateRoute(ast.name, method)).join('\n\n')
}

function buildContent(ast) {
  return `const products = require('../server/products');\n\n${
    ''}module.exports = function productsRoutes(app){\n\n${
    generateRoutes(ast)}\n};`
}

getFileAst('./test-files/products.js', (ast) => {
  generateFile(ast, 'routes', 'productsRoutes.js', buildContent(ast))
})
