const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: 'wanted',
    usage: '[@user (or not)]',
    description : "Wanted dead or alive.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) user = message.member;
        let avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Wanted().getImage(avatar, "5");
        let attach = new MessageAttachment(img, "wanted.png");
        message.channel.send({ files: [attach] });
    }
}