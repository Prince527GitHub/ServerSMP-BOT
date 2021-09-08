const { MessageEmbed, Message, Client } = require('discord.js');
const simplydjs = require('simply-djs')

module.exports = {
    name: 'setup-ticket',
    description: "Setup tickets.",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      simplydjs.ticketSystem(message, message.channel)
  }
}
