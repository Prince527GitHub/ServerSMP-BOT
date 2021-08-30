const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: 'trash',
    usage: '[@user (or not)]',
    description : "Spider man say's you/friend is trash.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) user = message.member;
        let avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Trash().getImage(avatar);
        let attach = new MessageAttachment(img, "delete.png");
        message.channel.send({ files: [attach] });
    },
};