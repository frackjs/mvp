const generateFetcher = require('./generateFetcher')
const getFileAst = require('./getFileAst')
const { generateFile, generateItems } = require('./util')

function buildContent(ast) {
  return `import axios from 'axios';\n\n${
    ''}const ${ast.name} = {};\n\n${
    generateItems(ast, generateFetcher)}\n`
}

module.exports = function generateFetchersFile(actionsDir, clientSrcDir) {
  getFileAst(`./${actionsDir}/products.js`, (ast) => {
    generateFile(ast, `${clientSrcDir}/${actionsDir}`, 'products.js', buildContent(ast))
  })
}
