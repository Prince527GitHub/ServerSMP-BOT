const { Client, Message, MessageEmbed } = require('discord.js');
const premiumSchema = require('../../models/premium-user')

module.exports = {
    name: 'del-premium-user',
    category: 'owner',
    usage: '[user]',
    aliases: ['dpu'],
    description: "Owner can remove premium from users!",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
        const member = message.mentions.members.first() || message.guid.members.cache.get(args[0]);
        if(!member) return message.reply("Please specify a valid member!");
        premiumSchema.findOne({
            User: member.id
        }, async(err, data) => {
            if(!data) return message.reply("User was previously not added to database!");
            data.delete();
            message.channel.send('Removed user from database!');
        })
    }
}
