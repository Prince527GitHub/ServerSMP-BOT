const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const schema = require('../../models/premium-guild');

module.exports = {
    name: 'premium-guild',
    category: 'owner',
    usage: '[ add | remove ] [ guild id ] [ expire ]',
    aliases: ['pg'],
    description: "Add premium to the guild!",
    owner: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args[0]?.toLowerCase();
        if(!query) return message.reply("Query incorrect.");

        if(query === "add") {
            if(!args[1]) return message.reply("Please specify a guild id!");
            if(!client.guilds.cache.has(args[1])) return message.reply("Its an invalid guild id!");
            schema.findOne({ Guild: args[1] }, async(err, data) => {
                if(data) data.delete();
                if(args[2]) {
                    const Expire = day(args[2]).valueOf();
                    new schema({
                        Guild: args[1],
                        Expire,
                        Permanent: false,
                    }).save();
                } else {
                    new schema({
                        Guild: args[1],
                        Expire: 0,
                        Permanent: true,
                    }).save();
                }
                message.reply('Saved data!');
            })
        } else if(query === "remove") {
            if(!args[1]) return message.reply("Please specify a guild id!");
            schema.findOne({
                Guild: args[1]
            }, async(err,data) => {
                if(!data) return message.reply('The id that you have provided is not present in the database!');
                data.delete();
                return message.reply('Deleted data!');
            })
        } else return message.reply("Query incorrect")

    }
}