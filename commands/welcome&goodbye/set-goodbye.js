const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/goodbye');

module.exports = {
    name: 'set-goodbye',
    category : 'welcome/goodbye',
    usage: '',
    description : "Set the channel for the goodbye card.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
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
            message.reply(`${channel} has been set as the goodbye channel.`)
        })
    }
}