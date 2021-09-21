const client = require('../index');
const { welcomeImage } = require('ultrax');
const Schema = require('../models/welcome');
const { registerFont } = require('canvas');
const WelcomeCard = require('../models/welcome-card');
const { welcomecard } = require('popcat-wrapper');
const { MessageAttachment } = require('discord.js');
const { drawCard } = require('discord-welcome-card');

client.on("guildMemberAdd", async(member) => {
    WelcomeCard.findOne({ Guild: member.guild.id }, async(err, data) => {
      if(data) {
        const channel = member.guild.channels.cache.get(await data.Channel);
        registerFont(await data.FontPath, { family: await data.FontName });
        const image = await welcomeImage(
          await data.Background,
          member.user.displayAvatarURL({ format:  "png", size: 512 }),
          member.user.username,
          `Welcome To ${member.guild.name}`,
          `Member ${member.guild.memberCount}`,
          await data.Color,
          {
            font: await data.FontName,
            attachmentName: `welcome-${member.id}`,
            text1_fontSize: 80,
            text2_fontSize: 50,
            text3_fontSize: 30
          }
        )
        return channel.send({ files: [image] });
      }
    })

    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
        if(await client.mongo_quick.has(`welcome-type-${member.guild.id}`) === false) return;

        const channel = member.guild.channels.cache.get(data.Channel);

        if(await client.mongo_quick.get(`welcome-type-${member.guild.id}`) === "simple") {

          const simple_welcome = new MessageAttachment(await welcomecard("https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png", member.user.displayAvatarURL({ format:  "png", size: 512 }), member.user.username, `Welcome To ${member.guild.name}`, `Member ${member.guild.memberCount}`), `welcome-${member.guild.id}.png`)

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
