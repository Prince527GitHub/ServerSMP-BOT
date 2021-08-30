const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const { Color, isColor } = require("coloras");

module.exports = {
    name: 'color',
    aliases : ['colour'],
    description : "Generate a random color.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let random;

        if (!args.join(" ")) {
          random = true;
        } else {
          if (!isColor(args.join(" ")).color) return message.channel.send("Not a valid color");
        }
  
        const value = random ? null : args.join(" ");
        const color = new Color(value);
  
        const embed = new MessageEmbed()
          .setColor(color.toHex())
          .addFields([
            { name: "HEX", value: color.toHex(), inline: true },
            { name: "RGB", value: color.toRgb(), inline: true },
            { name: "HSL", value: color.toHsl(), inline: true },
            { name: "HSV", value: color.toHsv(), inline: true },
            { name: "CMYK", value: color.toCmyk(), inline: true },
            { name: "ㅤ", value: `[Image Url](${color.imageUrl})`, inline: true }
          ])
          .setImage(color.imageUrl);
  
        return message.channel.send({ embeds: [embed] });
    },
};