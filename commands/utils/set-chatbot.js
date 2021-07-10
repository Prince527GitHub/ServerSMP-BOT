const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/chatbot-channel');

module.exports = {
    name: 'set-chatbot',
    category : 'utils',
    usage: '[#channel (or not)]',
    aliases : ['scb'],
    description : "Set the channel for the chat bot!",
    userPermission: ["ADMINISTRATOR"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const channel = message.mentions.channels.first() || message.channels;
      Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(data) data.delete();
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
        message.channel.send(`Saved chatbot channel to ${channel}.`);
      })
    }
  }
