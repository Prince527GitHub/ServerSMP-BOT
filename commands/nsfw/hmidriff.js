const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: 'hmidriff',
    category : 'nsfw',
    usage: '',
    description : "Image of hentai midriff.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const nsfwchannel = await Client.dashboard.getVal(message.guild.id, "nsfwchannel");
        const nsfwch = await Client.dashboard.getVal(message.guild.id, "nsfwch");
        if(db.has(`nsfw-${message.guild.id}`)=== false) return message.reply("NSFW commands disabled on this guild.");
            if(nsfwch === "true") {
                if (message.channel.id === nsfwchannel) {
        const image = await nsfw.hmidriff();
        const embed = new MessageEmbed()
            .setTitle(`Hentai Midriff Image`)
            .setColor("GREEN")
            .setImage(image);
        message.channel.send(embed);
                }
            } else {
        const image = await nsfw.hmidriff();
        const embed = new MessageEmbed()
            .setTitle(`Hentai Midriff Image`)
            .setColor("GREEN")
            .setImage(image);
        message.channel.send(embed);
            }
    }
}
