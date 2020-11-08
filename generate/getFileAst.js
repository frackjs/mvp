const fs = require('fs')

function getMethodAst(line, objName) {
  const methodName = line.split(`${objName}.`)[1].split('=')[0].trim()
  const isSingleArgArrowFunction = line.match('=>') !== null && line.match(/\)\s*=>/) === null
  let args
  if (isSingleArgArrowFunction) {
    args = [line.split('=')[1].trim()]
  } else {
    args = line.split('(')[1].split(')')[0].split(',').map((x) => x.trim()).filter((x) => x !== '')
  }
  return { name: methodName, args }
}

function matchMethodLine(str, objName) {
  const re = new RegExp(`^${objName}\\.[A-Za-z0-9|_$]+\\s*\\=(?!=)\\s*.+`)
  const r = str.match(re)
  return r === null ? '' : r[0]
}

function getFileAst(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    const model = filename.split('/').pop().split('.').shift()
    const lines = data.split('\n')

    const ast = {
      name: model,
      methods: [],
    }

    lines.forEach((l) => {
      const clean = l.trim()
      const match = matchMethodLine(clean, model)
      if (match !== '') {
        ast.methods.push(getMethodAst(clean, model))
      }
    })

    callback(ast)
  })
}

module.exports = getFileAst
