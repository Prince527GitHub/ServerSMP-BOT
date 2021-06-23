const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();

module.exports = {
    name: 'uviewwinners',
    category : 'uno',
    usage: '',
    aliases : ['uvw'],
    description : "View the winner of the game.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await discordUNO.viewWinners(message);
    }
}
