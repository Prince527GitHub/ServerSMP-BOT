const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'fumo',
    description : "Sends fumo",
    usage: "#channel",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      let fumochannel = message.mentions.channels.first();
      if(fumochannel) return fumochannel.send("https://tenor.com/view/fumo-meme-fumo-gif-19721565");
      if(!fumochannel) return message.reply("Please mention a channel");
    }
  }
