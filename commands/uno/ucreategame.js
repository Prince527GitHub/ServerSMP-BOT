const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'ucreategame',
    category : 'uno',
    usage: '',
    aliases : ['uc'],
    description : "Create a UNO game.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await client.discordUNO.createGame(message);
    }
}
