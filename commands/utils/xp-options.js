const { MessageEmbed, Message, Client } = require('discord.js');

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
            if(client.mongo_quick.has(`xp-ch-on${message.guild.id}`)) {
                await client.mongo_quick.remove(`xp-ch-on-${message.guild.id}`)
                await client.mongo_quick.remove(`xp-channel-${message.guild.id}`)
            }
            await client.mongo_quick.set(`xp-${message.guild.id}`, true)
            message.channel.send('Turned off xp commands/system.')
        } else if(args[0] === 'on') {
            await client.mongo_quick.remove(`xp-${message.guild.id}`)
            message.channel.send('Turned on xp commands/system.')
        } else if(message.mentions.channels.first()) {
            const channel = message.mentions.channels.first();
            await client.mongo_quick.set(`xp-ch-on-${message.guild.id}`, true)
            await client.mongo_quick.set(`xp-channel-${message.guild.id}`, channel.id)
            message.channel.send(`Turned on xp log channel at ${channel}.`)
        } else if(args[0] === 'off-ch') {
            await client.mongo_quick.remove(`xp-ch-on-${message.guild.id}`)
            await client.mongo_quick.remove(`xp-channel-${message.guild.id}`)
            message.channel.send('Turned off xp log channel.')
        } else {
          console.log(await client.mongo_quick.has(`xp-ch-on-${message.guild.id}`))
            message.reply("Query is invalid.");
        }
    }
}
