const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'nuke',
    category : 'moderation',
    usage: '',
    description : "Delete the channel the the command was done in and remake it, so it is purge but for channels.",
    userPermission: ["MANAGE_CHANNELS"],
    botPermission: ["MANAGE_CHANNELS"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        await message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parentID);
            ch.setPosition(message.channel.position);
            message.channel.delete();
            ch.send('This channel has been nuked.')
        })
    }
}
