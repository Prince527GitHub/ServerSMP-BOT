const { MessageEmbed, Message, Client } = require('discord.js');

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
        await client.discordUNO.viewTable(message);
    }
}
