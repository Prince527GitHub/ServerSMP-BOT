const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'coinflip',
    category : 'games',
    aliases : ['c-f'],
    description : "Flips a coin and randomly generates either heads or tails.",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      let chances = [
         "Heads",
         "Tails"
      ];
      let response = chances[Math.floor(Math.random() * chances.length)];
      const user = message.author;
      message.channel.send(new MessageEmbed()
         .setTitle("Coin Flip")
         .setDescription(`The coin landed on ${response}!`)
         .setFooter(`Request by ${user.username}`)
         .setColor("#daffff")
         .setThumbnail("https://i.pinimg.com/originals/c1/2d/c5/c12dc536b8f8797b629eb9942a2dbbf1.gif")
      )
    }
  }
