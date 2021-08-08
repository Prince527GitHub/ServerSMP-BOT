const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');
const { music } = require('../../collection/index');

module.exports = {
    name: 'stop',
    category : 'music',
    aliases : ['s'],
    usage: '',
    description : "Stop the music player.",
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
      music.delete(message.guild.id);
      music.delete(`music-${message.guild.id}`);
      await Client.player.stop(message);
      message.channel.send(
          new MessageEmbed()
              .setDescription("⏹ **|** The music player has been stopped")
              .setColor("#5400FF")
      )
    }
}
