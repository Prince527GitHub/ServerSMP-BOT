const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 't-role',
    category : 'ticket',
    usage: '[@role]',
    aliases : ['t-r'],
    description : "Change the support role of the tickets.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(db.has(`ticket-${message.guild.id}`) === false) return message.reply("Ticket commands are disabled!");
        const role = message.mentions.roles.first()
        client.ticket.setRole(message, role) //Set the support role, that gets pinged when a new ticket is created!
    }
}
