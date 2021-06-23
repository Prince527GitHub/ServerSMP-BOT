const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordUNO } = require("discord-uno");
const discordUNO = new DiscordUNO();

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
        await discordUNO.updateSetting(message);
    }
}
