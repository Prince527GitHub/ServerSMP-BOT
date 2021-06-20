const { MessageEmbed, Message, Client } = require('discord.js');
const giveawayClient = require('../../client/index')

module.exports = {
    name: 'rmv-cache',
    category : 'owner',
    usage: '',
    aliases : ['rmvc'],
    description : "Removed the cached giveaways!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== '364105797162237952') return message.reply("This command can only be used by the owner!");
        giveawayClient.removeCachedGiveaways(true)
    }
}