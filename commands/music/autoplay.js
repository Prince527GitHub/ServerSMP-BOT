const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'autoplay',
    category : 'music',
    aliases : ['auto'],
    usage: '',
    description : "Stop the bot from playing a random song.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return message.reply('Please join a voice channel!')
        let mode = Client.player.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}