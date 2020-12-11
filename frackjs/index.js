const fs = require('fs')
const generateFetchersFile = require('./generateFetchersFile')
const generateRoutesFile = require('./generateRoutesFile')

module.exports = function start(options) {
  fs.readdirSync(options.actions).forEach((f) => {
    const name = f.split('.')[0]
    generateFetchersFile(options.actions, options.clientSrc, name)
    generateRoutesFile(options.actions, name)
  })
}
