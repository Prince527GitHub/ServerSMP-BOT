const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

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
          let ramcolor = colourRandom();
          let img = await new DIG.Color().getImage(ramcolor);
          let attach = new MessageAttachment(img, "color.png");
          const embed = new MessageEmbed()
              .setColor(ramcolor)
              .setTitle("Random Color")
              .setDescription(['Your color is `',ramcolor,'`'].join(''))
          message.channel.send(embed);
          message.channel.send(attach);
    }
}
