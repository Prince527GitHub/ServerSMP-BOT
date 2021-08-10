const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'stop-ticket',
    category : 'ticket',
    description : "Turn off/on tickets!",
    userPermission: ["ADMINISTRATOR"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if(client.db_json.has(`ticket-toggle-${message.guild.id}`)=== false) {
        client.db_json.set(`ticket-toggle-${message.guild.id}`, false)
        message.channel.send("Disabled tickets!")
      } else {
        client.db_json.delete(`ticket-toggle-${message.guild.id}`)
        message.channel.send("Enabled tickets!")
      }
    }
  }
