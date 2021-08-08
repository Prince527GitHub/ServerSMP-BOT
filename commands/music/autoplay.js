const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'autoplay',
    category : 'music',
    aliases : ['auto'],
    description : "Stop the bot from playing a random song.",
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
      );
      const queue = Client.player.getQueue(message)
      if (!queue) return message.channel.send(
          new MessageEmbed()
              .setDescription("There is nothing playing")
              .setColor("YELLOW")
      )
      let mode = Client.player.toggleAutoplay(message);
      message.channel.send(
          new MessageEmbed()
              .setDescription("▶ **|** Set autoplay mode to **`" + (mode ? "ON" : "OFF") + "`**")
              .setColor("#5400FF")
      );
    }
}
