const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordTicket } = require('discord_ticket_maker');

module.exports = {
    name: 't-role',
    category : 'ticket',
    usage: '[@role]',
    aliases : ['t-r'],
    description : "Change the support role of the tickets.",
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
        const role = message.mentions.roles.first()
        ticket.setRole(message, role) //Set the support role, that gets pinged when a new ticket is created!
    }
}