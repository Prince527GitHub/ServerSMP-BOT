const { Message, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

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
            .setImage("https://github.com/Prince527GitHub/ServerSMP-BOT/blob/web/assets/qrcode.png?raw=true")
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setURL('https://discord.com/oauth2/authorize?client_id=778409873573412874&permissions=124553522550&scope=bot%20applications.commands')
                .setLabel('Invite!')
        ).addComponents(
            new MessageButton()
                .setStyle('LINK')
                .setURL('https://serversmp.arpismp.ml/')
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