const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const Schema = require('../../models/warn');

module.exports = {
    name: 'warns',
    usage: '[@user]',
    description : "See all the warns that a user has got.",
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
            if(data) {
                const help = data.content.map((w, i) => `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`)
                message.channel.send({ embeds: [
                    new MessageEmbed()
                        .setTitle(`${user.user.tag}'s warns`)
                        .setDescription(String(help))
                        .setColor("BLUE")
                ] })
            } else {
                message.channel.send('User has no data')
            }
        })
    }
}