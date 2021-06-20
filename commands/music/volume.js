const { MessageEmbed, Message, Client } = require('discord.js');
const DisTube = require('distube');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'volume',
    category : 'music',
    aliases : ['v'],
    usage: '[0-100]',
    description : "Change the music player's volume.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.voice.channel) return message.reply('Please join a voice channel!')
        let amount = parseInt(args[0]);
        if(!amount) return message.channel.send("Please specify a volume.")
        if(amount > 100) {
            message.channel.send("It can only go up to 100.")
        } else {
            Client.player.setVolume(message, amount);
            var total = 100;
            var current = amount;
            let bar = progressbar.filledBar(total, current, 40, "□", "■")[0];
            message.channel.send(`Set the new volume to ${amount}%.`);
            message.channel.send(bar);
        }
    }
}