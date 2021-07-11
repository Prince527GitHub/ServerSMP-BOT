const { MessageEmbed, Message, Client } = require('discord.js');
const ultrax = require('ultrax')

module.exports = {
    name: 'wikipedia',
    category : 'extra',
    usage: '[serch]',
    description : "Serch stuff on wikipedia!",
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      let query = args[0];
      if(!query) return message.reply("Please specify a query!");
      const res = new ultrax.Wikipedia({
      	message: message,
      	color: "RED",
      	query: query
      });
      res.fetch();
    }
  }
