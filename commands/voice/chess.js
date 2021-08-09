const { MessageEmbed, Message, Client } = require('discord.js');
const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'chess',
    category : 'voice',
    usage: '',
    description : "Play discord chess in vc.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.member.voice.channel) {
            Client.discordTogether.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {
              const button = new MessageButton()
                  .setStyle("url")
                  .setLabel("Chess In The Park")
                  .setEmoji("♟️")
                  .setURL(`${invite.code}`)
              return message.channel.send({
                buttons: [button],
                embed: new MessageEmbed()
                  .setTitle("Chess In The Park")
                  .setDescription('Click the button below to play chess in vc')
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
