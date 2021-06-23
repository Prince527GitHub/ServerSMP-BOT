const { MessageEmbed, Message, Client } = require('discord.js');

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
        await client.discordUNO.viewSettings(message);
    }
}
