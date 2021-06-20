const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordTicket } = require('discord_ticket_maker');

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
        const ticket = await Client.dashboard.getVal(message.guild.id, "ticket");
        if(ticket === "false") return message.reply("Ticket commands are disabled!");
        const reason = message.content.slice(7)
        ticket.makeTicket(message, reason, "swrf")//Creates a new ticket, the reason is optional!
    }
}