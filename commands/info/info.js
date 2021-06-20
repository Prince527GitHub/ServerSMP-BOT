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
            .setThumbnail("https://serversmp.netlify.app/assets//disconnect.png")
            .addField("Ping:", `\`${client.ws.ping}ms\``)
            .addField("Servers:", `\`${client.guilds.cache.size}\``)
        const button1 = new MessageButton()
            .setStyle('url')
            .setURL('https://serversmp.netlify.app/invite3.html') 
            .setLabel('Invite!')
        const button2 = new MessageButton()
            .setStyle('url')
            .setURL('https://serversmp.netlify.app/') 
            .setLabel('Website!')

        message.channel.send({
            buttons: [button1, button2],
            embed: embed
        })
    }
}