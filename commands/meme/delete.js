const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
    name: "delete",
    description : "Give's a image of you getting deleted",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.delete(avatar);
        let attachment = new MessageAttachment(image, "deleted.png");
        return message.channel.send({ files: [attachment] });
    },
};