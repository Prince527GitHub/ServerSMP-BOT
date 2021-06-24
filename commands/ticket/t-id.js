const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordTicket } = require('discord_ticket_maker');

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
        const ticket = await Client.dashboard.getVal(message.guild.id, "ticket");
        if(ticket === "false") return message.reply("Ticket commands are disabled!");
        const ID = await ticket.fetchChanID(message)
        message.channel.send(`This channels id is ${ID}`)
    }
}
