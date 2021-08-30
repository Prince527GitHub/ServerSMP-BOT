const { MessageEmbed, Message, Client } = require('discord.js');
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = {
    name: 'hentaithigh',
    description : "Hentai thigh.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(await client.mongo_quick.has(`nsfw-${message.guild.id}`)=== false) return message.reply("NSFW commands disabled on this guild.");
            if(await client.mongo_quick.has(`nsfw-ch-${message.guild.id}`) === true) {
                if (message.channel.id === await client.mongo_quick.get(`nsfw-ch-${message.guild.id}`)) {
                    const image = await nsfw.hentaithigh();
                    const embed = new MessageEmbed()
                        .setTitle(`Hentai Thigh Image`)
                        .setColor("GREEN")
                        .setImage(image);
                    message.channel.send({ embeds: [embed] });
      } else return message.reply(`<#${await client.mongo_quick.get(`nsfw-ch-${message.guild.id}`)}> Is the NSFW channel!`);
            } else {
                const image = await nsfw.hentaithigh();
                const embed = new MessageEmbed()
                    .setTitle(`Hentai Thigh Image`)
                    .setColor("GREEN")
                    .setImage(image);
                message.channel.send({ embeds: [embed] });
            }
    }
}
