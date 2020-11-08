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

generateFetchersFile(options.actions, options.clientSrc)
generateRoutesFile(options.actions)
