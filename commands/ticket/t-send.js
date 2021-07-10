const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 't-send',
    category : 'ticket',
    usage: '',
    aliases : ['ts'],
    description : "Send a message to ticket?",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(db.has(`ticket-${message.guild.id}`) === false) return message.reply("Ticket commands are disabled!");
        const channel = message.mentions.channels.first()
        const ya = message.content.slice(5)
        client.ticket.msgTicketChannel(message, channel, ya)//fixes coming soon, for this command
    }
}
