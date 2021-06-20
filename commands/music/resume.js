const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'resume',
    category : 'music',
    usage: '',
    description : "Resume the paused music.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const queue = Client.player.getQueue(message)
        if (!queue) return message.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
        Client.player.resume(message)
        message.channel.send("Resumed the song!")
    }
}