const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'usettings',
    category : 'uno',
    usage: '',
    aliases : ['us'],
    description : "Change the UNO settings.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await client.discordUNO.updateSetting(message);
    }
}
