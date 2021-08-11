const client = require('../index')
const Schema = require('../models/modlogs')
const { MessageEmbed } = require('discord.js')

client.on('messageUpdate', async(oldMessage, newMessage) => {
  if (!oldMessage.guild) return;
    const data = await Schema.findOne({ Guild: oldMessage.guild.id })
    if(!data) return;
    const channel = oldMessage.guild.channels.cache.get(data.Channel);
    const logsEmbed = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription(`Message sent by <@${oldMessage.author.id}> edited in ${oldMessage.channel.name}.`)
      .addField('Old', ` \`\`\` ${oldMessage} \`\`\` `)
      .addField('New', ` \`\`\` ${newMessage} \`\`\` `)
      .setTitle(`Action Took: MessageChanged`)
      .setTimestamp()
      .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
    channel.send(logsEmbed)
})
