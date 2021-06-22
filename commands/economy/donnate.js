const { MessageEmbed, Message, Client } = require('discord.js');
const client = require('../..');

module.exports = {
    name: 'donnate',
    category : 'economy',
    usage: '[@user] [money]',
    description : "Give money to users!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first();
        if(!user) return message.reply("Please mention a user!");
        const coinsToDonnate = args[1];
        if(!coinsToDonnate) return message.reply("Please specify an amount of coins to donnate!");
        if(isNaN(coinsToDonnate)) return message.reply("Coins must be in numbers!");
        const convertedDonnatation = parseInt(coinsToDonnate);
        if(await client.bal(message.author.id) < convertedDonnatation) return message.reply("You have insufficient balance!");
        await client.rmv(message.author.id, convertedDonnatation);
        await client.add(user.id, convertedDonnatation);
        message.channel.send(`${message.author} has donnated ${convertedDonnatation} coins to ${user}.`)
    }
}