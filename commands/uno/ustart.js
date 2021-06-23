const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'ustart',
    category : 'uno',
    usage: '',
    description : "Start the uno game!",
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
        await client.discordUNO.startGame(message);
    }
  }
