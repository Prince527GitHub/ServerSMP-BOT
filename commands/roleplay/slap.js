const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: 'slap',
    category : 'roleplay',
    usage: '[@user]',
    description : "Slap someone.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.reply("You need to mention a user!");
        let avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png' });
        let avata = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Batslap().getImage(avata, avatar);
        let attach = new MessageAttachment(img, "slap.png");
        message.channel.send(attach);
    }
}