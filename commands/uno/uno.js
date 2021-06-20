const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");

module.exports = {
    name: 'uno',
    category : 'uno',
    usage: '',
    description : "Call the UNO!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await discordUNO.UNO(message);
    }
}