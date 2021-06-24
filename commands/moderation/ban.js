const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'ban',
    usage: '[@user] [Reason]',
    category : 'moderation',
    description : "Ban users.",
    userPermission: ["BAN_MEMBERS"],
    botPermission: ["BAN_MEMBERS"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        const reason = args[1] || "There was no reason!";
        toBan.ban({
            reason: reason
        })
        message.channel.send(`${toBan} has been banned from the server!\nReason: ${reason}`)
    }
}
