const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'unban',
    description : "Unban users using commands.",
    userPermission: ["BAN_MEMBERS"],
    botPermission: ["BAN_MEMBERS"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let toBan = await client.users.fetch(args[0])
        if(!toBan) return message.reply("You need the id of the user.")
        if(!args[0]) return message.reply("You need the id of the user.")
        const reason = args[1] || "There was no reason!";
        message.guild.members.unban(toBan, reason)
        message.channel.send(`${toBan} has been unbanned from the server!`)
    }
}