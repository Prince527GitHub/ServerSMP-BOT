const { MessageEmbed, Message, Client } = require('discord.js');
const giveawayClient = require('../../client/index')

module.exports = {
    name: 'gend',
    category : 'giveaway',
    usage: '[message id of giveaway]',
    description : "End the giveaway!",
    userPermission: ["MANAGE_MESSAGES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        giveawayClient.end(args[0], false)
    }
}
