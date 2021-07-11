const Client = require('../index');
const Schema = require('../models/global');
const { MessageEmbed } = require('discord.js');

Client.on('message', (message) => {
    if(message.author.bot) return;
    Schema.findOne({ Channel: message.channel.id, Activated: true }, async(err, data) => {
        if(data) {
            Schema.find({ Activated: true }, async(err, data) => {
                data.map(({ Channel }) => {
                    if(Channel === message.channel.id) return;
                    Client.channels.cache.get(Channel).send(
                            new MessageEmbed()
                                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                                .setDescription(message.content)
                                .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                                .setColor("RANDOM")
                                .setTimestamp()
                        );
                });
            });
        }
    });
});
