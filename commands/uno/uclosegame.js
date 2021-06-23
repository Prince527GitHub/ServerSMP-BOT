const { MessageEmbed, Message, Client } = require('discord.js');

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
        await client.discordUNO.closeGame(message);
    }
}
