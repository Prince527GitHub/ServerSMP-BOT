const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");

module.exports = {
    name: 'uclosegame',
    category : 'uno',
    usage: '',
    aliases : ['ucg'],
    description : "Close the game and don't show the scores.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await discordUNO.closeGame(message);
    }
}