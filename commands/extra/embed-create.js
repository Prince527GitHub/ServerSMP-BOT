const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
    name: 'embed-create',
    description : "Create embeds!",
    userPermission: ["MANAGE_MESSAGES"],
    userPremium: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        simplydjs.embedCreate(message)
    }
}
