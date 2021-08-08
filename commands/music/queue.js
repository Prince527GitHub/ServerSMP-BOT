const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'queue',
    category : 'music',
    aliases : ['q'],
    usage: '',
    description : "Show the current queue.",
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
      message.channel.send(
          new MessageEmbed()
              .setAuthor("Music Queue", message.client.user.avatarURL())
              .setDescription(queue.songs.map((song, id) => `**${id + 1}.** **[${song.name}](${song.url})**`).slice(0, 10).join("\n"))
              .setColor("#5400FF")
      );
    }
}
