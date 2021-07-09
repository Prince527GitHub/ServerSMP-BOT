const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'kick',
    usage: '[@user]',
    category : 'moderation',
    description : "Kick users.",
    userPermission: ["KICK_MEMBERS"],
    botPermission: ["KICK_MEMBERS"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
            let member = message.mentions.members.first()
            if(!member) message.channel.send("Please mention someone")
            else {
                member.kick().then(mem => {
                  client.modlogs({
                    Member: mem,
                    Action: 'Kick',
                    Color: "#fc4949",
                  }, message)
                    message.channel.send(`Kicked ${mem.user.username}!`)
                })
            }
    }
}
