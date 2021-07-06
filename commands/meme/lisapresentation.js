const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: 'lisapresentation',
    category : 'meme',
    usage: '',
    aliases : ['lp'],
    description : "Lisa presentaition meme template.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      //if (message.content.length > 303) return message.reply("Max characters of 300.")
        let text = args.slice(0).join(" ");
        if(!text) return message.reply("You need to type something!")
        let img = await new DIG.LisaPresentation().getImage(text);
        let attach = new MessageAttachment(img, "LisaPresentation.png");
        message.channel.send(attach);
    }
}
