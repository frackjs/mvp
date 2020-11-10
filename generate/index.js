const fs = require('fs')
const commandLineArgs = require('command-line-args')
const generateFetchersFile = require('./generateFetchersFile')
const generateRoutesFile = require('./generateRoutesFile')

const optionDefinitions = [
  {
    name: 'actions', type: String, defaultValue: 'actions',
  },
  {
    name: 'clientSrc', type: String, defaultValue: 'client/src',
  },
]

const options = commandLineArgs(optionDefinitions)

fs.readdirSync(options.actions).forEach((f) => {
  const name = f.split('.')[0]
  generateFetchersFile(options.actions, options.clientSrc, name)
  generateRoutesFile(options.actions, name)
})
