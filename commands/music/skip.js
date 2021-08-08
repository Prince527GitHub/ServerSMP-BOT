const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');
const { music } = require('../../collection/index');

module.exports = {
    name: 'skip',
    category : 'music',
    aliases : ['sk'],
    usage: '',
    description : "Skip the current music.",
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
      let queue = Client.player.getQueue(message);
      if (!queue) return message.channel.send(
          new MessageEmbed()
              .setDescription("There is nothing playing")
              .setColor("YELLOW")
      )
      await Client.player.skip(message);
      message.channel.send(
          new MessageEmbed()
              .setDescription(queue.songs.map((song, id) => `⏭ **|** Skipped **[${song.name}](${song.url}})**`).slice(0, 1))
              .setColor("#5400FF")
      )
    }
}
