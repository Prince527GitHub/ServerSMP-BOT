const { Message, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const env = {
  permissions: ["KICK_MEMBERS", "BAN_MEMBERS", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "MANAGE_CHANNELS", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "ADD_REACTIONS", "MANAGE_GUILD", "USE_EXTERNAL_EMOJIS", "MANAGE_WEBHOOKS", "MANAGE_ROLES", "MANAGE_NICKNAMES", "CHANGE_NICKNAME", "MOVE_MEMBERS", "DEAFEN_MEMBERS", "MUTE_MEMBERS", "SPEAK", "CONNECT", "PRIORITY_SPEAKER", "USE_VAD"],
  scopes: ["applications.commands", "bot"]
}

module.exports = {
    name: "info",
    description: "Give's some info on the bot.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Info")
            .setThumbnail("https://github.com/Prince527GitHub/ServerSMP-BOT/blob/web/web/bot(node)/icon.png?raw=true")
            .addField("Ping:", `\`${client.ws.ping}ms\``)
            .addField("Servers:", `\`${client.guilds.cache.size}\``)
            .setImage("https://github.com/Prince527GitHub/ServerSMP/blob/ServerSMP-Web/assets/qrcode.png?raw=true")
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setURL(client.generateInvite({ scopes: env.scopes, permissions: env.permissions }))
                .setLabel('Invite!')
        ).addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setURL('https://serversmp.xyz/')
                .setLabel('Website!')
        ).addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setURL('https://youtu.be/dQw4w9WgXcQ')
                .setLabel('Support!')
        )
        message.channel.send({ embeds: [embed], components: [row] })
    },
};
