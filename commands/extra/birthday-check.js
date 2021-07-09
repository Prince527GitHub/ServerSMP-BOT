const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/birthday');

module.exports = {
    name: 'birthday-check',
    category : 'extra',
    usage: '',
    aliases : ['b-check'],
    description : "Check birthday!",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const user = message.mentions.users.first() || message.author;
      Schema.findOne({ User: user.id }, async(err, data) => {
        if(!data) return message.reply("User has not set a birthday.");
        message.channel.send(`${user} birthday is on ${data.Birthday}`);
      })
    }
  }
