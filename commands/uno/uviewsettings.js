const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");

module.exports = {
    name: 'uviewsettings',
    category : 'uno',
    usage: '',
    aliases : ['uvs'],
    description : "View the current settings.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await discordUNO.viewSettings(message);
    }
}