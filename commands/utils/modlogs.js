const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/modlogs');

module.exports = {
    name: 'set-logs',
    category : 'utils',
    usage: '[off/#channel (of not)]',
    description : "Set the logs channel!",
    userPermission: ["ADMINISTRATOR"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if(args[0] === 'off') {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(data) data.delete();
          if(!data) return message.reply("This server has no modlogs channel!");
          message.channel.send("Deleted modlogs channel!");
        })
      } else {
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
  }
