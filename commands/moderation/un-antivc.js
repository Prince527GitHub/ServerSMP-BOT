const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'un-antivc',
    category : 'moderation',
    usage: '[@user]',
    description : "Let the user join vc.",
    userPermission: ["MANAGE_ROLES"],
    botPermission: ["MANAGE_ROLES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const target = message.mentions.members.first();
        if(!target) return message.reply("Please specify a member!");
        const role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
        if(!role) return message.reply("The role doesn't exist!");
        if(!target.roles.cache.has(role.id)) return message.reply(`${target} is not antivced!`);
        target.roles.remove(role.id)
        message.channel.send(`${target} has been un-antivced!`)
    }
}
