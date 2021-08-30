const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch')

module.exports = {
    name: 'fishing',
    description : "Play discord fishing in vc.",
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
                    target_application_id: "814288819477020702",
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
                    .setTitle("I was unable to start a fishington session!")
                    .setColor("RED")
                ]})

              const button = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel("Fishing")
                    .setEmoji("🐟")
                    .setURL(`https://discord.com/invite/${invite.code}`)
              ) 
              message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle("Fishington")
                        .setDescription('Click the button below to play fishington in vc')
                        .setColor("BLUE")
                    ],
                components: [button]
            })});

        } else {
          return message.channel.send({ embeds: [
            new MessageEmbed()
                .setTitle("You must be connected to a voice channel to use this command!")
                .setColor("RED")
          ]}
            )
        }
    },
};