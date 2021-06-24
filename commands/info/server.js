const {
  MessageEmbed,
  Message,
  Client
} = require('discord.js');

module.exports = {
  name: 'server',
  category: 'info',
  usage: '',
  description: "Give's info on the server that you are on.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
    const botSize = message.guild.members.cache.filter(m => m.user.bot).size
    const {
      name,
      roles,
      channels,
      createdAt,
      premiumSubscriptionCount,
      memberCount,
      region
    } = message.guild
    message.channel.send(
        new MessageEmbed()
        .setTitle(name)
        .setDescription(`Some simple server information.`)
        .setThumbnail(message.guild.iconURL({
          dynamic: true
        }))
        .addField('Owner', `${message.guild.owner.user.username}`, true)
        .addField('Boosters', premiumSubscriptionCount, true)
        .addField('Region', region.toUpperCase(), true)
        .addField('Total Members', memberCount, true)
        .addField('Total Bots', botSize, true)
        .addField('Roles', roles.cache.size, true)
        .setFooter(`Created on`)
        .setColor(roleColor)
        .setTimestamp(createdAt)
      )
      .catch((e) => message.channel.send(`error: ${e.message}`))
  }
}
