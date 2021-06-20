const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'poker',
    category : 'voice',
    usage: '',
    description : "Play discord poker in vc.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.member.voice.channel) {
            Client.discordTogether.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {
            return message.channel.send(`${invite.code}`);
            });
        } else {
            message.channel.send("You need to be in a VC!")
        }
    }
}