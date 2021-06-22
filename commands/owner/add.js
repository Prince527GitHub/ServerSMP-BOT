const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'add-bal',
    category : 'owner',
    usage: '',
    description : "Add money to user!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
        const member = message.mentions.members.first() || message.member;
        client.add(member.id, parseInt(args[0]));
        message.channel.send('Added balance!')
    }
}