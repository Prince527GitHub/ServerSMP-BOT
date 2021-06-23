const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'uno',
    category : 'uno',
    usage: '',
    description : "Call the UNO!",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await client.discordUNO.UNO(message);
    }
}
