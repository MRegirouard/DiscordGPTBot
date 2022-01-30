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
    'Discord API Token':'',
    'Ignore Prefix':'!gpt'
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

    log.debug('Listening for messageCreate events...')
    discordClient.on('messageCreate', (message) =>
    {
        log.verbose('Message received. Content: \"' + message.content + '\", Author: \"' + message.author.tag + '\"')

        if (message.author.id === discordClient.user.id)
            log.verbose('Message was sent by this Discord bot. Ignoring.')
        else if (message.content.startsWith(config['Ignore Prefix']))
            log.verbose('Message starts with \"' + config['Ignore Prefix'] + '\" ignore prefix. Ignoring.')
        else
        {
            log.silly('Sending startTyping event...')
            message.channel.sendTyping()
            log.debug('Sent startTyping event.')
        }
    })
})