const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'daily',
    category : 'economy',
    usage: '',
    description : "Daily money!",
    cooldown: 1000 * 60 * 60 * 24,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 2000) + 1;
        message.channel.send(`You received **${coins}** coins today! Make sure to come and claim it again tommorow!`);
        client.add(message.author.id, coins);
    }
}