const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'badges',
    category : 'extra',
    usage: '[@player]',
    description : "Show the badges of the mention user.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const flags = user.flags.toArray();
        console.log(flags);
        message.channel.send(`${user}'s badges: ${flags.join(', ')}`)
    }
}