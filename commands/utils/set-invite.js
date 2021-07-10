const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/invites');

module.exports = {
    name: 'set-invite',
    category : 'utils',
    usage: '',
    description : "Set the channel for the info on the invite.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const channel = message.mentions.channels.first();
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
