const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'add-bal',
    category : 'owner',
    usage: '',
    description : "Add money to user!",
    owner: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;
        client.add(member.id, parseInt(args[0]));
        message.channel.send('Added balance!')
    }
}
