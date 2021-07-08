const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'xp-commands',
    category : 'utils',
    usage: '[on/off]',
    aliases : ['xp-c'],
    description : "Turn on or off xp commands/system!",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(args[0] === 'off') {
            await db.set(`xp-${message.guild.id}`, true)
            message.channel.send('Turned off xp commands/system.')
        } else if(args[0] === 'on') {
            await db.delete(`xp-${message.guild.id}`)
            message.channel.send('Turned on xp commands/system.')
        }
    }
}
