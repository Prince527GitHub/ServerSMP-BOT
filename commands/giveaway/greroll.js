const { MessageEmbed, Message, Client } = require('discord.js');
const giveawayClient = require('../../client/index')

module.exports = {
    name: 'greroll',
    category : 'giveaway',
    usage: '[message id of giveaway]',
    description : "Reroll the giveaway!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!messages.member.permission.has('MANAGE_MESSAGES')) return messages.reply('You do not have sufficient permissions!')
        giveawayClient.reroll(args[0]);
    }
}