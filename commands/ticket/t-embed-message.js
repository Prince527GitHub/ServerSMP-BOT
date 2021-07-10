const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 't-embed-message',
    category : 'ticket',
    usage: '',
    aliases : ['tem'],
    description : "Change the embed message?",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(db.has(`ticket-${message.guild.id}`) === false) return message.reply("Ticket commands are disabled!");
        const ya = message.content.slice(14)
        client.ticket.editEmbed(message, ya)
    }
}
