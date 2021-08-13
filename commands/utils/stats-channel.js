const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'stats-channel',
    category : 'utils',
    usage: '[ create | remove ]',
    description : "",
    userPermission: ["ADMINISTRATOR"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if(args[0].toLowerCase === "remove") {

      } else if(args[0].toLowerCase === "create") {
          message.guild.channels.create(`ticket-${client.db_json.get(`ticket-${button.guild.id}`)}`, {
              type: 'voice',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ['CONNECT']
                }
              ]
          }).then(result => {

          })
          message.guild.channels.create(`ticket-${client.db_json.get(`ticket-${button.guild.id}`)}`, {
              type: 'voice',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ['CONNECT']
                }
              ]
          }).then(result => {

          })
          message.guild.channels.create(`ticket-${client.db_json.get(`ticket-${button.guild.id}`)}`, {
              type: 'voice',
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: ['CONNECT']
                }
              ]
          }).then(result => {

          })
      } else {
        message.reply("Query is not correct!")
      }
    }
  }
