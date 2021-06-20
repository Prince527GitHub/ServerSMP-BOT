const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'betrayal',
    category : 'voice',
    usage: '',
    description : "Play discord betrayal in vc.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(message.member.voice.channel) {
            bot.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
            return message.channel.send(`${invite.code}`);
            });
        } else {
            message.channel.send("You need to be in a VC!")
        }
    }
}