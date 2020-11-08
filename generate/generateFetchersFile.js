const generateFetcher = require('./generateFetcher')
const getFileAst = require('./getFileAst')
const { generateFile, generateItems } = require('./util')

function buildContent(ast) {
  let out = ''
  out += `const options = function(verb, params){
  const options = {
    method: verb,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(params)
  };
}
function getData(url){ return fetch(url).then(r => r.json()) };
function postData(url, params){ return fetch(url, options('POST', params)).then(r => r.json()) };
function putDate(url, params){ return fetch(url, options('PUT', params)).then(r => r.json()) };
function deleteData(url, params){ return fetch(url, options('DELETE', params)).then(r => r.json()) };`
  out += '\n\n'
  out += `const ${ast.name} = {};\n\n`
  out += `${generateItems(ast, generateFetcher)}\n`
  return out
}

module.exports = function generateFetchersFile(actionsDir, clientSrcDir) {
  getFileAst(`./${actionsDir}/products.js`, (ast) => {
    generateFile(ast, `${clientSrcDir}/${actionsDir}`, 'products.js', buildContent(ast))
  })
}
