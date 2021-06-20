const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordTicket } = require('discord_ticket_maker');

module.exports = {
    name: 't-add-user',
    category : 'ticket',
    usage: '[@user]',
    aliases : ['tau'],
    description : "Add users to the ticket?",
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
        const channel = message.mentions.channels.first()
        const user = message.mentions.users.first()
        ticket.ticketAddUser(channel, user)
    }
}