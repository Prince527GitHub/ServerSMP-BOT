const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'unban',
    category : 'moderation',
    description : "Unban users using commands.",
    userPermission: ["BAN_MEMBERS"],
    botPermission: ["BAN_MEMBERS"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        let toBan = await bot.users.fetch(args[0])
        const reason = args[1] || "There was no reason!";
        message.guild.members.unban(toBan, reason)
        message.channel.send(`${toBan} has been unbanned from the server!`)
    }
}
