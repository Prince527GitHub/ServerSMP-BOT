const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'kick',
    usage: '[@user]',
    category : 'moderation',
    description : "Kick users.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            let member = message.mentions.members.first()
            if(!member) message.channel.send("Please mention someone")
            else {
                member.kick().then(mem => {
                    message.channel.send(`Kicked ${mem.user.username}!`)
                })
            }
        } else {
            message.reply("You don't have permission to do that")
        }
    }
}