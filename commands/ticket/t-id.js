const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 't-id',
    category : 'ticket',
    usage: '',
    aliases : ['tid'],
    description : "Get the id of the channel?",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(db.has(`ticket-${message.guild.id}`) === false) return message.reply("Ticket commands are disabled!");
        const ID = await client.ticket.fetchChanID(message)
        message.channel.send(`This channels id is ${ID}`)
    }
}
