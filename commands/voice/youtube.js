const { MessageEmbed, Message, Client } = require('discord.js');
const { MessageButton } = require('discord-buttons');

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
              const button = new MessageButton()
                  .setStyle("url")
                  .setLabel("Youtube Together")
                  .setEmoji("870909668090851399")
                  .setURL(`${invite.code}`)
              return message.channel.send({
                buttons: [button],
                embed: new MessageEmbed()
                  .setTitle("Youtube Together")
                  .setDescription('Click the button below to watch youtube in vc')
                  .setColor("RED")
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
