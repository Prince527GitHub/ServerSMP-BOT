const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'poll',
    category : 'extra',
    usage: '[#channel] [what is the poll]',
    description : "Admins can make polls.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            let pollChannel = message.mentions.channels.first();
            let pollDescription = args.slice(1).join(' ');
            let embedPoll = new MessageEmbed()
            .setTitle('New Poll!')
            .setDescription(pollDescription)
            .setColor('YELLOW')
            let msgEmbed = await pollChannel.send(embedPoll);
            await msgEmbed.react('👍')
            await msgEmbed.react('👎')
       } else {
           return message.channel.send('You dont have perms.')
       }
    }
}