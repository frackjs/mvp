const generateFetch = require('./generateFetch')
const getFileAst = require('./getFileAst')
const generateFile = require('./generateFile')

function generateFetchs(ast) {
  return ast.methods.map((method) => generateFetch(ast.name, method)).join('\n\n')
}

function buildContent(ast) {
  return `import axios from 'axios';\n\n${
    ''}const ${ast.name} = {};\n\n${
    generateFetchs(ast)}\n`
}

getFileAst('./test-files/products.js', (ast) => {
  generateFile(ast, 'client/src/server', 'products.js', buildContent(ast))
})
