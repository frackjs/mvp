const fs = require('fs')
const generateFetch = require('./generateFetch')
const getFileAst = require('./getFileAst')

function generateFetchs(ast) {
  return ast.methods.map((method) => generateFetch(ast.name, method)).join('\n\n')
}

function createDirectoryChain(directory) {
  let prevDir = ''
  directory.split('/').forEach((d) => {
    let curr = d

    if (prevDir !== '') {
      curr = `${prevDir}/${curr}`
    }

    if (!fs.existsSync(curr)) {
      fs.mkdirSync(curr)
      prevDir = curr
    }
  })
}

function buildFileContent(ast) {
  return `import axios from 'axios';\n\n${
    ''}const ${ast.name} = {};\n\n${
    generateFetchs(ast)}\n`
}

function generateFetchsFile(ast) {
  const content = buildFileContent(ast)
  const directory = 'client/src/server'
  const filename = `${ast.name}.js`

  createDirectoryChain(directory)

  fs.writeFile([directory, filename].join('/'), content, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Generated -- ${[directory, filename].join('/')}`)
    }
  })
}

getFileAst('./test-files/products.js', (ast) => {
  generateFetchsFile(ast)
})
