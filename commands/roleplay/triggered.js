const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const canvacord = require("canvacord");

module.exports = {
    name: 'triggered',
    category : 'roleplay',
    usage: '',
    description : "Make's a gif of you being triggered.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trigger(avatar);
        let attachment = new MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);
    }
}