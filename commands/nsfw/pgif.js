const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: 'pgif',
    category : 'nsfw',
    usage: '',
    description : "Gif of porn.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        //const nsfwcommand = await Client.dashboard.getVal(message.guild.id, "nsfw");
        const nsfwchannel = await Client.dashboard.getVal(message.guild.id, "nsfwchannel");
        const nsfwch = await Client.dashboard.getVal(message.guild.id, "nsfwch");
        //if(nsfwcommand === "false") return message.reply("NSFW commands disabled on this guild.")
        if(db.has(`nsfw-${message.guild.id}`)=== false) return message.reply("NSFW commands disabled on this guild.");
            if(nsfwch === "true") {
                if (message.channel.id === nsfwchannel) {
        const image = await nsfw.pgif();
        const embed = new MessageEmbed()
            .setTitle(`Porn gif <:CUMMYWUMMIES:842208284223602728>`)
            .setColor("GREEN")
            .setImage(image);
        message.channel.send(embed);
                }
            } else {
        const image = await nsfw.pgif();
        const embed = new MessageEmbed()
            .setTitle(`Porn gif <:CUMMYWUMMIES:842208284223602728>`)
            .setColor("GREEN")
            .setImage(image);
        message.channel.send(embed);
            }
    }
}
