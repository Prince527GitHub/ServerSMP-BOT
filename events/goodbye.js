const client = require('../index');
const { MessageAttachment } = require('discord.js');
const { drawCard } = require('discord-welcome-card');
const Schema = require('../models/goodbye');

client.on('guildMemberRemove', async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
        const channel = member.guild.channels.cache.get(data.Channel);

        let goodbye_subtitle;
        if(await client.mongo_quick.has(`goodbye-text-${member.guild.id}`) === true) {
            goodbye_subtitle = `${await client.mongo_quick.get(`goodbye-text-${member.guild.id}`)}`
        } else {
            goodbye_subtitle = " "
        }

        let goodbye_title;
        if(await client.mongo_quick.has(`goodbye-title-${member.guild.id}`) === true) {
            goodbye_title = `${await client.mongo_quick.get(`goodbye-title-${member.guild.id}`)}`
        } else {
            goodbye_title = "Goodbye,"
        }

        let goodbye_theme;
        if(await client.mongo_quick.has(`goodbye-theme-${member.guild.id}`) === true) {
            goodbye_theme = `${await client.mongo_quick.get(`goodbye-theme-${member.guild.id}`)}`
        } else {
            goodbye_theme = "dark"
        }

        const user = member.user;
        const image = await drawCard({
            blur: true,
            title: goodbye_title,
            theme: goodbye_theme,
            text: `${user.username}#${user.discriminator}!`,
            subtitle: goodbye_subtitle,
            rounded: true,
            border: true,
            avatar: user.displayAvatarURL({ format: 'png' })
        });
        const attachment = new MessageAttachment(image, 'bye.png');
        channel.send({ files: [attachment] });
    });
});
