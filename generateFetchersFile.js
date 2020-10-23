const generateFetcher = require('./generateFetcher')
const getFileAst = require('./getFileAst')
const { generateFile, generateItems } = require('./util')

function buildContent(ast) {
  return `import axios from 'axios';\n\n${
    ''}const ${ast.name} = {};\n\n${
    generateItems(ast, generateFetcher)}\n`
}

getFileAst('./actions/products.js', (ast) => {
  generateFile(ast, 'client/src/server', 'products.js', buildContent(ast))
})
