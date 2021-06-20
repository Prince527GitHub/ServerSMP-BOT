const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/premium-user');

module.exports = {
    name: 'premium-remove-user',
    category : 'owner',
    usage: '[user id]',
    aliases : ['pru'],
    description : "Remove user from premium",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.author.id !== '364105797162237952') return message.reply("This command can only be used by the owner!");
        const id = args[0];
        Schema.findOne({ User: id }, async(err, data) => {
            if(!data) return message.reply('That user does not exist in the database!');
            data.delete();
        message.reply("User was deleted for premium successfully!");
        })
    }
}