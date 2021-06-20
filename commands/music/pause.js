const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'pause',
    category : 'music',
    usage: '',
    description : "Pause the music in queue.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const queue = Client.player.getQueue(message)
        if (!queue) return message.channel.send(`${bot.emotes.error} | There is nothing in the queue right now!`)
        if (queue.pause) {
            distube.resume(message)
            return message.channel.send("Resumed the song!")
        }
        Client.player.pause(message)
        message.channel.send("Paused the song!")
    }
}