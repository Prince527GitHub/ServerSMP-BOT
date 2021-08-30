const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const canvacord = require("canvacord");

module.exports = {
    name: 'triggered',
    description : "Make's a gif of you being triggered.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) user = message.member;
        let avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trigger(avatar);
        let attachment = new MessageAttachment(image, "triggered.gif");
        message.channel.send({ files: [attachment] });
    }
}