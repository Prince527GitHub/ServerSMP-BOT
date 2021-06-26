const { MessageEmbed, Message, Client } = require('discord.js');
const moment = require('moment');
const { snipe } = require('../../collection/index');

module.exports = {
    name: 'snipe',
    category : 'moderation',
    usage: '',
    description : "Snipe deleted messages!",
    userPermission: ["MANAGE_MESSAGES"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const snipes = snipe.get(message.channel.id)
      if(!snipes) return message.reply('There is no message deleted in this channel!');
      const cnipe = +args[0] - 1 || 0;
      const target = snipes[cnipe];
      if(!target) return message.reply(`There is only ${snipes.length} message!`);
      const { msg, time, image } = target;
      message.channel.send(
        new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setImage(image)
        .setDescription(msg.content)
        .setFooter(`${moment(time).fromNow()} | ${cnipe + 1} / ${cnipe.length}`)
        .setColor("RANDOM")
      )
    }
  }
