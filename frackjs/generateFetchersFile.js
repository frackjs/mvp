const generateFetcher = require('./generateFetcher')
const getFileAst = require('./getFileAst')
const { generateFile, generateItems } = require('./util')

function buildContent(ast) {
  let out = ''
  out += `const options = function(verb, params){
  return {
    method: verb,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(params)
  };
}

function queryStr(params){
  return new URLSearchParams(params).toString()
}

function getData(url, params){ return fetch(url + queryStr(params)).then(r => r.json()) };
function postData(url, params){ return fetch(url, options('POST', params)).then(r => r.json()) };
function putData(url, params){ return fetch(url, options('PUT', params)).then(r => r.json()) };
function deleteData(url, params){ return fetch(url, options('DELETE', params)).then(r => r.json()) };`
  out += '\n\n'
  out += `const ${ast.name} = {};\n\n`
  out += `${generateItems(ast, generateFetcher)}\n`
  out += `\n`
  out += `module.exports = products`
  return out
}

module.exports = function generateFetchersFile(actionsDir, clientSrcDir, name) {
  getFileAst(`./${actionsDir}/${name}.js`, (ast) => {
    generateFile(ast, `${clientSrcDir}/${actionsDir}`, `${name}.js`, buildContent(ast))
  })
}
