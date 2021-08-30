const client = require('../index');
const { MessageEmbed } = require('discord.js');
const Schema = require('../models/boost');

client.on('guildMemberBoost', (member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
        const embed = new MessageEmbed()
            .setAuthor(`${member.user.tag} just boosted ${member.guild.name}!`, member.user.displayAvatarURL({ format: 'png' }))
            .setImage(`https://frenchnoodles.xyz/api/endpoints/boostercard/?image=${member.user.displayAvatarURL({ format: 'png' })}?size=4096`)
        const channel = member.guild.channels.cache.get(data.Channel);
        channel.send({ embeds: [embed] });
    });
});