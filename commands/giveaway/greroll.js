const { MessageEmbed, Message, Client } = require('discord.js');
const giveawayClient = require('../../client/index')

module.exports = {
    name: 'greroll',
    category : 'giveaway',
    usage: '[message id of giveaway]',
    description : "Reroll the giveaway!",
    userPermission: ["MANAGE_MESSAGES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        giveawayClient.reroll(args[0]);
    }
}
