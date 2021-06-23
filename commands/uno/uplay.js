const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();

module.exports = {
    name: 'uplay',
    category : 'uno',
    usage: '',
    aliases : ['up'],
    description : "Play a card in your hand.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await discordUNO.playCard(message);
    }
}
