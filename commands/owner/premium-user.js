const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const premiumSchema = require('../../models/premium-user')

module.exports = {
    name: 'premium-user',
    usage: '[ add | remove ] [ @user ]',
    aliases: ['pu'],
    description: "Owner can remove premium from users!",
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
            const member = message.mentions.members.last() || message.guild.members.cache.get(args[1]);
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
        } else if(query === "remove") {
            const member = message.mentions.members.last() || message.guild.members.cache.get(args[1]);
            if(!member) return message.reply("Please specify a valid member!");
            premiumSchema.findOne({
                User: member.id
            }, async(err, data) => {
                if(!data) return message.reply("User was previously not added to database!");
                data.delete();
                message.channel.send('Removed user from database!');
            })
        } else return message.reply("Query incorrect")
        
    }
}