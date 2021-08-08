const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');
const { music } = require('../../collection/index');

module.exports = {
    name: 'play',
    category : 'music',
    aliases : ['p'],
    usage: '[youtube video or playlist link | youtube video name]',
    description : "Play some music.",
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
      const text = args.join(" ");
      if(!text) return message.channel.send(
          new MessageEmbed()
              .setDescription(`Invalid usage, use **\`${await client.prefix(message)}help play\`** for more information`)
              .setColor("RED")
      )
      if(music.has(message.guild.id)=== true) {
          if(text === music.get(message.guild.id)) {
            if(music.get(`music-${message.guild.id}`)=== 5) {
              music.delete(message.guild.id);
              music.delete(`music-${message.guild.id}`);
              return message.channel.send(
                new MessageEmbed()
                  .setDescription(`Duplicated music, please use \`${await client.prefix(message)}repeat\` instead`)
                  .setColor("RED")
              )
            }
          }
      }
      music.set(message.guild.id, text);
      if(music.has(`music-${message.guild.id}`)=== true) {
        let numbers;
        numbers = music.get(`music-${message.guild.id}`) + 1;
        await music.set(`music-${message.guild.id}`, numbers);
      } else {
        music.set(`music-${message.guild.id}`, 1)
      }
      await Client.player.play(message, text);
    }
}
