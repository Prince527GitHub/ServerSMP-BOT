const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const { Color, isColor } = require("coloras");

function colourRandom() {
    var num = Math.floor(Math.random() * Math.pow(2, 24));
    return '#' + ('00000' + num.toString(16)).substr(-6);
    };

module.exports = {
    name: 'color',
    category : 'extra',
    usage: '',
    aliases : ['colour'],
    description : "Generate a random color.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
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

      return message.channel.send(embed);
    }
}
