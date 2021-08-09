const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'fishing',
    category : 'voice',
    usage: '',
    description : "Play discord fishing in vc.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.member.voice.channel) {
            Client.discordTogether.createTogetherCode(message.member.voice.channelID, 'fishing').then(async invite => {
              const button = new MessageButton()
                  .setStyle("url")
                  .setLabel("Poker Night")
                  .setEmoji("♠️")
                  .setURL(`${invite.code}`)
              return message.channel.send({
                buttons: [button],
                embed: new MessageEmbed()
                  .setTitle("Poker Night")
                  .setDescription('Click the button below to play poker in vc')
                  .setColor("WHITE")
            })});
        } else {
          return message.channel.send(
            new MessageEmbed()
                .setTitle("You must be connected to a voice channel to use this command!")
                .setColor("RED")
            )
        }
    }
}
