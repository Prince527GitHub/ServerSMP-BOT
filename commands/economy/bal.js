const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'bal',
    category : 'economy',
    usage: '',
    description : "Show your bal!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;
        const bal = await client.bal(member.id);
        message.channel.send(bal + " coins");
    }
}