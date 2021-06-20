const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/welcome');

module.exports = {
    name: 'check-welcome',
    category : 'welcome/goodbye',
    usage: '',
    description : "Check what channel the welcome card will be sent in.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply("This guild has no data stored");
            const channel = client.channels.cache.get(data.Channel);
            message.reply(`Welcome channel => ${channel}`);
        })
    }
}