const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'xp-options',
    category : 'utils',
    usage: '[ on | off | #channel | off-ch ]',
    description : "Turn on or off xp commands/system or set a channel where the logs will be sent!",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(args[0] === 'off') {
            if(db.has(`xp-channel-${message.guild.id}`)=== true) {
                db.delete(`xp-channel-${message.guild.id}`)
            }
            db.set(`xp-${message.guild.id}`, true)
            message.channel.send('Turned off xp commands/system.')
        } else if(args[0] === 'on') {
            db.delete(`xp-${message.guild.id}`)
            message.channel.send('Turned on xp commands/system.')
        } else if(message.mentions.channels.first()) {
            const channel = message.mentions.channels.first();
            db.set(`xp-channel-${message.guild.id}`, channel.id)
            message.channel.send(`Turned on xp log channel at ${channel}.`)
        } else if(args[0] === 'off-ch') {
          if(db.has(`xp-channel-${message.guild.id}`)=== true) {
            db.delete(`xp-channel-${message.guild.id}`)
            message.channel.send('Turned off xp log channel.')
          } else {
            message.reply("There was not data!")
          }
        } else {
            message.reply("Query is invalid.");
        }
    }
}
