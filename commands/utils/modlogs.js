const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/modlogs');

module.exports = {
    name: 'set-logs',
    category : 'utils',
    usage: '',
    description : "Set the logs channel!",
    userPermission: ["ADMINISTRATOR"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const channel = message.mentions.channels.first() || message.channel;
      Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(data) data.delete();
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
        message.channel.send(`${channel} has been saved as the modlogs channel!;`)
      })
    }
  }
