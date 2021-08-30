const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')

module.exports = {
    name: 'youtube',
    description: "Send's a link that if you click while in vc will allow you to watch youtube videos from discord.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.member.voice.channel) {
          
              const channel = message.member.voice.channel

              fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "755600276941176913",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${client.token}`,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(invite => {
                if (!invite.code) return message.channel.send({ embeds: [
                  new MessageEmbed()
                    .setTitle("I was unable to start a youtube session!")
                    .setColor("RED")
                ]})

                const button = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel("Youtube Together")
                    .setEmoji("870909668090851399")
                    .setURL(`https://discord.com/invite/${invite.code}`)
              )
              message.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle("Youtube Together")
                    .setDescription('Click the button below to watch youtube in vc')
                    .setColor("RED")
                ],
                components: [button]
            })});

        } else {
          return message.channel.send({
              embeds: [
                new MessageEmbed()
                .setTitle("You must be connected to a voice channel to use this command!")
                .setColor("RED")
              ]
          })
        }
    },
};