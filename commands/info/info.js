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
            .setThumbnail("https://github.com/Prince527GitHub/ServerSMP-BOT/blob/web/web/bot(node)/icon.png?raw=true")
            .addField("Ping:", `\`${client.ws.ping}ms\``)
            .addField("Servers:", `\`${client.guilds.cache.size}\``)
            .setImage("https://github.com/Prince527GitHub/ServerSMP-BOT/blob/web/assets/qrcode.png?raw=true")
        const button1 = new MessageButton()
            .setStyle('url')
            .setURL('https://discord.com/oauth2/authorize?client_id=778409873573412874&permissions=261992476534&redirect_uri=https%3A%2F%2Fdiscord.com%2Fchannels%2F%40me&scope=bot%20applications.commands')
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
