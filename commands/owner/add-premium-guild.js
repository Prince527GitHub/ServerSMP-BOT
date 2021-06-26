const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require('../../models/premium-guild');
const day = require('dayjs');

module.exports = {
    name: 'add-premium-guild',
    category: 'owner',
    usage: '[guild id] [expire]',
    aliases: ['apg'],
    description: "Add premium to the guild!",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
        if(!args[0]) return message.reply("Please specify a guild id!");
        if(!client.guilds.cache.has(args[0])) return message.reply("Its an invalid guild id!");
        schema.findOne({ Guild: args[0] }, async(err, data) => {
            if(data) data.delete();
            if(args[1]) {
                const Expire = day(args[1]).valueOf();
                new schema({
                    Guild: args[0],
                    Expire,
                    Permanent: false,
                }).save();
            } else {
                new schema({
                    Guild: args[0],
                    Expire: 0,
                    Permanent: true,
                }).save();
            }
            message.reply('Saved data!');
        })
    }
}
