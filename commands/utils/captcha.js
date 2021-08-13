const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'captcha',
    category : 'utils',
    usage: '[on/off]',
    description : "Turn on or off the captcha system!",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(args[0] === 'on') {
            await client.mongo_quick.set(`captcha-${message.guild.id}`, true)
            message.channel.send('Turned on captcha feature')
        } else if(args[0] === 'off') {
            await client.mongo_quick.remove(`captcha-${message.guild.id}`)
            message.channel.send('Turned off captcha feature')
        }
    }
}
