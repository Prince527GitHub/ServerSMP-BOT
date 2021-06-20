const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/global');

module.exports = {
    name: 'remove-global',
    category : 'extra',
    usage: '',
    description : "Remove the global channel.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need permissions!");
        const query = { Guild: message.guild.id, Channel: message.channel.id, Activated: true }
        Schema.findOne(query, async(err, data) => {
            if(data) {
                await Schema.findOneAndDelete(query);
                return message.channel.send(`${message.channel} has been removed from international chat!`);
            }
            message.channel.send(`${message.channel} is not listed as an international chat channel!`);
        });
    }
}