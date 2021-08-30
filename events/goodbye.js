const Client = require('../index');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { drawCard } = require('discord-welcome-card');
const botdash = require('botdash.pro');
const Schema = require('../models/goodbye');
const dashboard = new botdash.APIclient(process.env.BOTDASH);

Client.on('guildMemberRemove', async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
        const byetheme = await dashboard.getVal(member.guild.id, "byetheme");
        const byemain = await dashboard.getVal(member.guild.id, "byemain");
        const byesub = await dashboard.getVal(member.guild.id, "byesub");
        const user = member.user;
            const image = await drawCard({
                blur: true,
                title: byemain,
                theme: byetheme,
                text: `${user.username}#${user.discriminator}!`,
                subtitle: byesub,
                rounded: true,
                border: true,
                avatar: user.displayAvatarURL({ format: 'png' })
            });
            const attachment = new MessageAttachment(image, 'bye.png');
            const channel = member.guild.channels.cache.get(data.Channel);
            channel.send({ files: [attachment] });
        });
});