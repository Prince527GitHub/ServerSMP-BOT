const client = require('../index')
const Schema = require('../models/modlogs')
const { MessageEmbed } = require('discord.js')

client.on('messageUpdate', async(oldMessage, newMessage) => {
    const data = await Schema.findOne({ Guild: oldMessage.guild.id })
    if(!data) return;
    const channel = oldMessage.guild.channels.cache.get(data.Channel);
    const logsEmbed = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription(`The old message: ${oldMessage}\n The new message: ${newMessage}`)
      .setTitle(`Action Took: MessageChanged`)
    channel.send(logsEmbed)
})
