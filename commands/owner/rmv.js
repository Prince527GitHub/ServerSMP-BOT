const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'rmv-bal',
    category : 'owner',
    usage: '',
    description : "Remove money from user!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
        const member = message.mentions.members.first() || message.member;
        client.rmv(member.id, parseInt(args[0]));
        message.channel.send('Removed balance!')
    }
}