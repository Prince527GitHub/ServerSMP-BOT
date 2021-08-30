const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: 'rip',
    usage: '[@user (or not)]',
    description : "Press f to pay respect.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) user = message.member;
        let avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Rip().getImage(avatar);
        let attach = new MessageAttachment(img, "delete.png");
        message.channel.send({ files: [attach] });
    }
}