const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");

module.exports = {
    name: 'ucards',
    category : 'uno',
    usage: '',
    aliases : ['uc'],
    description : "To view your cards in your hand.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await discordUNO.viewCards(message);
    }
}