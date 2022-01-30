const log = require('./customLog.js')

log.info('')
log.info('Starting Discord GPT Bot')
log.info('')

log.debug('Loading Discord.js package...')
const { Client, Intents } = require('discord.js')

log.debug('Creating Discord client...')
const discordClient = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES ], partials: [ 'MESSAGE', 'CHANNEL' ] })
log.verbose('Created Discord client.')

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

    log.debug('Logging in to Discord...')
    discordClient.login(config['Discord API Token']).then(() =>
    {
        log.info('Logged in to Discord.')
    }).catch((err) =>
    {
        log.error('Failed to log in to Discord.')
        log.error('Login Error: ' + err)
        log.error('Exiting with code 1.', () => { process.exit(1) })
    })
})
.catch((err) =>
{
    log.error('Error reading config file: ' + err)
    log.error('Exiting with exit code 1.')
    process.exit(1)
})

discordClient.on('ready', () =>
{
    log.info('Discord bot is ready and online.')
})