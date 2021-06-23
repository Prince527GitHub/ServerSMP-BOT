const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'uleave',
    category : 'uno',
    usage: '',
    aliases : ['usg'],
    description : "Users can leave the UNO game.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await client.discordUNO.removeUser(message);
    }
}
