const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/blacklist');

module.exports = {
    name: 'blacklist-add',
    category : 'owner',
    usage: '[serverID]',
    description : "Prince527 can blacklist a server from using the bot.",
    owner: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const id = args[0];
        if(!id) return message.reply('Please specify a guild id!');
        Schema.findOne({ Server: id }, async(err, data) => {
            if(data) return message.reply("This server has already been blacklisted before!");
            new  Schema({
                Server: id
            }).save();
            message.reply("Blacklisted a new server/guild!");
        })
    }
}
