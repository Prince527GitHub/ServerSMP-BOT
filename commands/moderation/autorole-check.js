const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('../../models/reaconDB');

module.exports = {
    name: 'autorole-check',
    category : 'moderation',
    usage: '',
    description : "Check what role is used for autorole.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const check = await db.has(`autorole-${message.guild.id}`);
        if(check === false) return message.reply('There is no autorole set!');
        const role = await db.get(`autorole-${message.guild.id}`);
        message.reply(`The autorole is <@&${role}>`);
    }
}