const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 't-close',
    category : 'ticket',
    usage: '',
    aliases : ['tc'],
    description : "Close the ticket.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(db.has(`ticket-${message.guild.id}`) === false) return message.reply("Ticket commands are disabled!");
        const ya = message.content.slice(6)
        const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id == ya || c.name == ya) || message.channel
        client.ticket.closeTicket(message, channel)
    }
}
