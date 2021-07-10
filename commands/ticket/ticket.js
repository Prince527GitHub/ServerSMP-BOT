const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'ticket',
    category : 'ticket',
    usage: '',
    aliases : ['tt'],
    description : "Make a ticket.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(db.has(`ticket-${message.guild.id}`) === false) return message.reply("Ticket commands are disabled!");
        const reason = message.content.slice(7)
        client.ticket.makeTicket(message, reason, "swrf")//Creates a new ticket, the reason is optional!
    }
}
