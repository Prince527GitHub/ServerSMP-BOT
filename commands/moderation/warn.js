const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const Schema = require('../../models/warn');

module.exports = {
    name: 'warn',
    usage: '[@user] [reason]',
    description : "Give a warn to a user.",
    userPermission: ["ADMINISTRATOR"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('User not found.')
        const reason = args.slice(1).join(" ")
        Schema.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new Schema({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        user.send({ embeds: [
            new MessageEmbed()
                .setDescription(`You have been warned for ${reason}`)
                .setColor("RED")
        ]})
        message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription(`Warned ${user} for ${reason}`).setColor('BLUE')
        ]})
    }
}