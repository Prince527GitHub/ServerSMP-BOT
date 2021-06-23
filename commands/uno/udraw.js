const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'udraw',
    category : 'uno',
    usage: '',
    aliases : ['ud'],
    description : "Draw a card from your hand.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await client.discordUNO.draw(message);
    }
}
