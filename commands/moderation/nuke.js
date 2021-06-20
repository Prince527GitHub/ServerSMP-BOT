const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'nuke',
    category : 'moderation',
    usage: '',
    description : "Delete the channel the the command was done in and remake it, so it is purge but for channels.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return;
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.reply("I need manage channels permissions.")
        await message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parentID);
            ch.setPosition(message.channel.position);
            message.channel.delete();
            ch.send('This channel has been nuked.')
        })
    }
}