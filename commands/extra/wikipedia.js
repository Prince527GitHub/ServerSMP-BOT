const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const { Wikipedia } = require('ultrax')

module.exports = {
    name: 'wikipedia',
    usage: '[serch]',
    description : "Serch stuff on wikipedia!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let query = args[0];
        if(!query) return message.reply("Please specify a query!");
        const res = new Wikipedia({
            message: message,
            color: "RED",
            query: query
        });
        res.fetch();
    }
}