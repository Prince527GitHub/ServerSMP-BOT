const { MessageEmbed, Message, Client } = require('discord.js');
const _8ball = require("../../assets/js/8ball.js");

module.exports = {
    name: '8ball',
    usage: '[ text ]',
    description : "Yep just a 8ball command",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const text = args.join(" ");
      if(!text) return message.reply("You need a question.");
      if(text.length > 1000) return message.reply("Question can't be more then 1000 length.")
      const randomNumber = Math.floor(Math.random() * _8ball.length);
      const responseText = _8ball[randomNumber];
      message.channel.send({ embeds: [
        new MessageEmbed()
          .setDescription(`**Question:** *${text}*\n**Answer:** ${responseText.emoji} *${responseText.text}*`)
          .setColor(`${responseText.color}`)
      ]});
    }
  }
