const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'youtube',
    category : 'voice',
    usage: '',
    description : "Send's a link that if you click while in vc will allow you to watch youtube videos from discord.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.member.voice.channel) {
            Client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
            return message.channel.send(`${invite.code}`);
            });
        } else {
            message.channel.send("You need to be in a VC!")
        }
    }
}