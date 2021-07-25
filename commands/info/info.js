const { MessageEmbed, Message, Client } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
    name: 'info',
    category : 'info',
    usage: '',
    description : "Give's some info on the bot.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Info")
            .setThumbnail("https://serversmp.arpismp.ml/assets/serversmp-bot.png")
            .addField("Ping:", `\`${client.ws.ping}ms\``)
            .addField("Servers:", `\`${client.guilds.cache.size}\``)
            .setImage("https://serversmp.arpismp.ml/qrcode.png")
        const button1 = new MessageButton()
            .setStyle('url')
            .setURL('https://discord.com/oauth2/authorize?client_id=778409873573412874&permissions=66579782&scope=bot')
            .setLabel('Invite!')
        const button2 = new MessageButton()
            .setStyle('url')
            .setURL('https://serversmp.arpismp.ml/')
            .setLabel('Website!')
        const button3 = new MessageButton()
            .setStyle('url')
            .setURL('https://youtu.be/dQw4w9WgXcQ')
            .setLabel('Support!')
        let row = new MessageActionRow()
            .addComponents(button1, button2, button3);

        message.channel.send(embed, row)
    }
}
