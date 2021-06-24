const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordTicket } = require('discord_ticket_maker');

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
        const ticket = await Client.dashboard.getVal(message.guild.id, "ticket");
        if(ticket === "false") return message.reply("Ticket commands are disabled!");
        const channel = message.mentions.channels.first()
        const user = message.mentions.users.first()
        ticket.ticketAddUser(channel, user)
    }
}
