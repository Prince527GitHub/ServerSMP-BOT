const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'eco',
    usage: '[ add | remove ] [ coins ]',
    description : "Add/Remove money to/from user!",
    owner: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args[0]?.toLowerCase();
        if(!query) return message.reply("Query incorrect.");

        if(query === "add") {
            const member = message.mentions.members
            if(!member) return message.reply("Please mention a member!")
            if(!args[2]) return message.reply("Please put the amount.")
            client.add(member.id, parseInt(args[2]));
            message.channel.send('Added balance!')
        } else if(query === "remove") {
            const member = message.mentions.members
            if(!member) return message.reply("Please mention a member!")
            if(!args[2]) return message.reply("Please put the amount.")
            client.rmv(member.id, parseInt(args[2]));
            message.channel.send('Removed balance!')
        } else return message.reply("Query incorrect")
    }
}