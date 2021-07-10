const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 't-add-user',
    category : 'ticket',
    usage: '[@user]',
    aliases : ['tau'],
    description : "Add users to the ticket?",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(db.has(`ticket-${message.guild.id}`) === false) return message.reply("Ticket commands are disabled!");
        const channel = message.mentions.channels.first()
        const user = message.mentions.users.first()
        client.ticket.ticketAddUser(channel, user)
    }
}
