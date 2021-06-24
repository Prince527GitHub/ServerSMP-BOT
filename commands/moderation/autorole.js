const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('../../models/reaconDB');

module.exports = {
    name: 'autorole',
    category : 'moderation',
    usage: '[@role]',
    description : "Set the autorole for when a user join's your server they get a role.",
    userPermission: ["MANAGE_ROLES"],
    botPermission: ["MANAGE_ROLES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!role) return message.channel.send('Role is not valid!')
        await db.set(`autorole-${message.guild.id}`, role.id);
        message.reply(`${role.name} is the autorole!`)
    }
}
