const { MessageEmbed } = require('discord.js');
const Schema = require('../models/global');
const client = require("../index");

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;
    Schema.findOne({ Channel: message.channel.id, Activated: true }, async(err, data) => {
        if(data) {
            Schema.find({ Activated: true }, async(err, data) => {
                data.map(({ Channel }) => {
                    if(Channel === message.channel.id) return;
                    client.channels.cache.get(Channel).send({ embeds: [
                        new MessageEmbed()
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(message.content)
                            .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                            .setColor("RANDOM")
                            .setTimestamp()
                    ]});
                });
            });
        }
    });
});
