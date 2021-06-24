const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/warn');

module.exports = {
    name: 'remove-all-warns',
    category : 'moderation',
    usage: '[@user]',
    aliases : ['clearwarn'],
    description : "Remove all the warn from a user.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')
        Schema.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await Schema.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`Cleared ${user.user.tag}'s warns`)
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
    }
}
