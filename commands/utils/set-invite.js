const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/invites');

module.exports = {
    name: 'set-invite',
    category : 'utils',
    usage: '[#channel (or not) | off]',
    description : "Set the channel for the info on the invite.",
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
          if(!data) return message.reply("This server has no invite channel!");
          message.channel.send("Deleted invite channel!");
        })
      } else {
        const channel = message.mentions.channels.first() || message.channel;
        if(!channel) return message.reply("Please mention a channel!");
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id,
                }).save();
            }
            message.reply(`${channel} has been set as the invite channel.`)
        })
      }
    }
}
