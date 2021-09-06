const client = require('../index');
const Schema = require('../models/welcome');
const { MessageAttachment } = require('discord.js');
const { drawCard } = require('discord-welcome-card');

client.on("guildMemberAdd", async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
        if(await client.mongo_quick.has(`welcome-type-${member.guild.id}`) === false) return;

        const channel = member.guild.channels.cache.get(data.Channel);

        if(await client.mongo_quick.get(`welcome-type-${member.guild.id}`) === "simple") {

          const simple_welcome = new MessageAttachment(`https://api.popcat.xyz/welcomecard?background=https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png&text1=${member.user.username}&text2=Welcome+To+${member.guild.name}&text3=Member+${member.guild.memberCount}&avatar=${member.user.displayAvatarURL({ format:  "png" })}`, `welcome-${member.guild.id}.png`)

          channel.send({ files: [simple_welcome] });

        } else if(await client.mongo_quick.get(`welcome-type-${member.guild.id}`) === "custom") {

          const welcome = await drawCard({
            blur: true,
            title: 'Welcome to this server,',
            theme: await client.mongo_quick.get(`welcome-theme-${member.guild.id}`),
            text: member.user.tag,
            subtitle: `MemberCount: ${member.guild.memberCount}`,
            rounded: true,
            border: true,
            avatar: member.user.avatarURL({ format: 'png' })
          })

          channel.send({ files: [new MessageAttachment(welcome, 'custom.png')] })

        } else return channel.send(`Welcome **${member.user.tag}** to **${member.guild.name}**! **ERROR TYPE SET NOT CORRECT!**`)

    });
});