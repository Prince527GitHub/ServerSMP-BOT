const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'resume',
    category : 'music',
    usage: '',
    description : "Resume the paused music.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      if(!message.member.voice.channel) return message.channel.send(
          new MessageEmbed()
              .setDescription("Sorry, but you need to be in a voice channel to do that")
              .setColor("YELLOW")
      )
      const queue = Client.player.getQueue(message)
      if (!queue) return message.channel.send(
          new MessageEmbed()
              .setDescription("There is nothing playing")
              .setColor("YELLOW")
      )
      if (queue.pause) {
          Client.player.resume(message)
          return message.channel.send(
              new MessageEmbed()
                  .setDescription("▶ **|** The music player has been resumed")
                  .setColor("#5400FF")
          )
      }
      message.channel.send(
          new MessageEmbed()
              .setDescription("The music player is not paused")
              .setColor("RED")
      )
    }
}
