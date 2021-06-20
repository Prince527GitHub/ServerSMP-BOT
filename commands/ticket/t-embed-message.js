const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordTicket } = require('discord_ticket_maker');

module.exports = {
    name: 't-embed-message',
    category : 'ticket',
    usage: '',
    aliases : ['tem'],
    description : "Change the embed message?",
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
        const ya = message.content.slice(14)
        ticket.editEmbed(message, ya)
    }
}