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
            Client.discordTogether.createTogetherCode(message.member.voice.channelID, 'betrayal').then(async invite => {
              const button = new MessageButton()
                  .setStyle("url")
                  .setLabel("Betrayal.io")
                  .setEmoji("ඞ")
                  .setURL(`${invite.code}`)
              return message.channel.send({
                buttons: [button],
                embed: new MessageEmbed()
                  .setTitle("Betrayal.io")
                  .setDescription('Click the button below to play betrayal (amoug us clone) in vc')
                  .setColor("BLUE")
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
