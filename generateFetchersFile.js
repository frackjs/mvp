const generateFetcher = require('./generateFetcher')
const getFileAst = require('./getFileAst')
const { generateFile, generateItems } = require('./util')

function buildContent(ast) {
  let out = ''
  out += 'const get = function(url){ return fetch(url).then(r => r.json()) };\n'
  out += 'const post = function(url, params){ return fetch(url, params).then(r => r.json()) };\n\n'
  out += `const ${ast.name} = {};\n\n`
  out += `${generateItems(ast, generateFetcher)}\n`
  return out
}

module.exports = function generateFetchersFile(actionsDir, clientSrcDir) {
  getFileAst(`./${actionsDir}/products.js`, (ast) => {
    generateFile(ast, `${clientSrcDir}/${actionsDir}`, 'products.js', buildContent(ast))
  })
}
