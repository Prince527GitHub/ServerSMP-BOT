const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'pause',
    category : 'music',
    usage: '',
    description : "Pause the music in queue.",
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
                  .setDescription("The music player is already paused")
                  .setColor("RED")
          );
      }
      Client.player.pause(message)
      message.channel.send(
          new MessageEmbed()
              .setDescription("⏸ **|** The music player has been paused")
              .setColor("#5400FF")
      );
    }
}
