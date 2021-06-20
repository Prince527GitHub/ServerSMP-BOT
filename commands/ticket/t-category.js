const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordTicket } = require('discord_ticket_maker');

module.exports = {
    name: 't-category',
    category : 'ticket',
    usage: '',
    aliases : ['tca'],
    description : "Change the catagory of the ticket.",
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
        const ID = message.content.slice(9)//must be the category id
        ticket.Category(message, ID)
        message.channel.send(`Ticket Category has been set!`)
    }
}