const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");

module.exports = {
    name: 'uendgame',
    category : 'uno',
    usage: '',
    aliases : ['ueg'],
    description : "End the UNO game.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await discordUNO.endGame(message);
    }
}