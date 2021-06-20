const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/global');

module.exports = {
    name: 'add-global',
    category : 'extra',
    usage: '[#channel]',
    description : "Set the global chat so you can talk to players on other servers.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need permissions!");
        Schema.findOne({ Guild: message.guild.id, Channel: message.channel.id, Activated: true }, async(err, data) => {
            if(data) return message.channel.send("Channel has already been listed as an international chat channel!");
            data = new Schema({
                Guild: message.guild.id,
                Channel: message.channel.id,
                Author: message.author.id,
                Activated: true,
            });
            data.save();
            message.channel.send(`${message.channel} has been added to the international chat!`)
        })
    }
}