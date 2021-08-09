const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'nsfw-options',
    category : 'utils',
    usage: '[ on | off | $channel | off-ch ]',
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
            if(await client.db_mongo.has(`nsfw-ch-${message.guild.id}`)=== true) {
              await client.db_mongo.set(`nsfw-ch-${message.guild.id}`, "xxxxxxxxxxxxxxxxxxxx")
            }
            message.channel.send('Turned off NSFW commands.')
        } else if(message.mentions.channels.first()) {
          if(await db.has(`nsfw-${message.guild.id}`)=== false) {
            await db.set(`nsfw-${message.guild.id}`, true)
          }
          const channel = message.mentions.channels.first();
          await client.db_mongo.set(`nsfw-ch-${message.guild.id}`, channel.id)
          message.channel.send(`Set NSFW channel to ${channel}.`)
        } else if(args[0] === "off-ch") {
          if(await client.db_mongo.has(`nsfw-ch-${message.guild.id}`)=== true) {
            await client.db_mongo.set(`nsfw-ch-${message.guild.id}`, "xxxxxxxxxxxxxxxxxxxx")
            message.channel.send("Turned off nsfw channel!")
          } else {
            message.channel.send("Data does not exist!")
          }
        }
    }
}
