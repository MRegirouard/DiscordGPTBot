const log = require('./customLog.js')

log.info('')
log.info('Starting Discord GPT Bot')
log.info('')

log.debug('Loading config file reader package...')

const configReader = require('@eta357/config-reader')

log.verbose('Loaded config file reader package.')

const configFile = "config.json"
var config
const configOptions = 
{
    'Discord API Token':''
}

log.verbose('Reading config file...')

configReader.readOptions(configFile, configOptions, false, true, true, 2).then((result) =>
{
    log.info('Config file read successfully.')
    config = result
})
.catch((err) =>
{
    log.error('Error reading config file: ' + err)
    log.error('Exiting with exit code 1.')
    process.exit(1)
})