const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 't-category',
    category : 'ticket',
    usage: '',
    aliases : ['tca'],
    description : "Change the catagory of the ticket.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(db.has(`ticket-${message.guild.id}`) === false) return message.reply("Ticket commands are disabled!");
        const ID = message.content.slice(9)//must be the category id
        client.ticket.Category(message, ID)
        message.channel.send(`Ticket Category has been set!`)
    }
}
