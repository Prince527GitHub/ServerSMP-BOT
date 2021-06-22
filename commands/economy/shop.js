const { MessageEmbed, Message, Client } = require('discord.js');
const items = require('../../models/shopItems');

module.exports = {
    name: 'shop',
    category : 'economy',
    usage: '',
    description : "Bye stuff!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(items.length === 0) return message.reply('There is no items for sale!');
        const shopList = items.map((value, index) => {
                return `**${index + 1})** ${value.item} -> ${value.price} coins!`;
            });
        message.channel.send(shopList);
    }
}