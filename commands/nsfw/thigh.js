const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: 'thigh',
    category : 'nsfw',
    usage: '',
    description : "A image of some thigh porn.",
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
        const image = await nsfw.thigh();
        const embed = new MessageEmbed()
            .setTitle(`Thigh Image`)
            .setColor("GREEN")
            .setImage(image);
        message.channel.send(embed);
                }
            } else {
        const image = await nsfw.thigh();
        const embed = new MessageEmbed()
            .setTitle(`Thigh Image`)
            .setColor("GREEN")
            .setImage(image);
        message.channel.send(embed);
            }
    }
}
