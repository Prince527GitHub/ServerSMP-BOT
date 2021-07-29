const { Client, Message, MessageEmbed } = require('discord.js');
const premiumSchema = require('../../models/premium-user')

module.exports = {
    name: 'add-premium-user',
    category: 'owner',
    usage: '[user]',
    aliases: ['apu'],
    description: "Owner can add premium to a user!",
    owner: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.guid.members.cache.get(args[0]);
        if(!member) return message.reply("Please specify a valid member!");
        premiumSchema.findOne({
            User: member.id
        }, async(err, data) => {
            if(data) return message.reply("This user has already gained premium features!");
            new premiumSchema({
                User: member.id
            }).save();
            return message.reply(`Added ${member} to the database!`);
        })
    }
}
