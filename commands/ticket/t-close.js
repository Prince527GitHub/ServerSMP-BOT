const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordTicket } = require('discord_ticket_maker');

module.exports = {
    name: 't-close',
    category : 'ticket',
    usage: '',
    aliases : ['tc'],
    description : "Close the ticket.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const ticket = await Client.dashboard.getVal(message.guild.id, "ticket");
        if(ticket === "false") return message.reply("Ticket commands are disabled!");
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | You must be an administrator of this server to use ticket!");
        }
        const ya = message.content.slice(6)
        const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id == ya || c.name == ya) || message.channel
        ticket.closeTicket(message, channel)
    }
}