const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: 'lisapresentation',
    aliases : ['lp'],
    description : "Lisa presentaition meme template.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let text = args.slice(0).join(" ");
        if(text.length > 300) return message.reply("Max characters of 300.");
        if(!text) return message.reply("You need to type something!");
        let img = await new DIG.LisaPresentation().getImage(text);
        let attach = new MessageAttachment(img, "LisaPresentation.png");
        message.channel.send({ files: [attach] });
    },
};