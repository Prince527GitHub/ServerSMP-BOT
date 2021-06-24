const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'nsfw-commands',
    category : 'extra',
    usage: '[on/off]',
    aliases : ['nsfw-c'],
    description : "Turn on or off NSFW commands!",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(args[0] === 'on') {
            await db.set(`nsfw-${message.guild.id}`, true)
            message.channel.send('Turned on NSFW commands.')
        } else if(args[0] === 'off') {
            await db.delete(`nsfw-${message.guild.id}`)
            message.channel.send('Turned off NSFW commands.')
        }
    }
}
