const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/premium-guild');

module.exports = {
    name: 'del-premium-guild',
    category: 'owner',
    usage: '[guild id]',
    aliases: ['dpg'],
    description: "Remove premium from the guild!",
    owner: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.reply("Please specify a guild id!");
        schema.findOne({
            Guild: args[0]
        }, async(err,data) => {
            if(!data) return message.reply('The id that you have provided is not present in the database!');
            data.delete();
            return message.reply('Deleted data!');
        })
    }
}
