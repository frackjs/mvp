const fs = require('fs')

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

module.exports = function generateFile(ast, directory, filename, content) {
  createDirectoryChain(directory)

  fs.writeFile([directory, filename].join('/'), content, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Generated -- ${[directory, filename].join('/')}`)
    }
  })
}
