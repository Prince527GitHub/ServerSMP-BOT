const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");

module.exports = {
    name: 'ujoin',
    category : 'uno',
    usage: '',
    aliases : ['uj'],
    description : "Users can join the UNO game.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await discordUNO.addUser(message);
    }
}