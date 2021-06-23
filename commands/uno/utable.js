const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();

module.exports = {
    name: 'utable',
    category : 'uno',
    usage: '',
    aliases : ['ut'],
    description : "View the current state of the game.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await discordUNO.viewTable(message);
    }
}
