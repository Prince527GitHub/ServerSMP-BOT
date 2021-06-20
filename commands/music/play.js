const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');

module.exports = {
    name: 'play',
    category : 'music',
    aliases : ['p'],
    usage: '[youtube video or playlist link | youtube video name]',
    description : "Play some music.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return message.reply('Please join a voice channel!')
        const text = args.join(" ");
        if(!text) return message.reply("Please specify a song!")
        await Client.player.play(message, text);
    }
}