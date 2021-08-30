const client = require('../index');
const Schema = require('../models/welcome');
const { MessageAttachment } = require('discord.js');
const { drawCard } = require('discord-welcome-card');
const  ultrax = require('ultrax')
const { registerFont } = require('canvas')
registerFont('ShadowsIntoLight-Regular.ttf', { family:  "Shadows Into Light" });

client.on("guildMemberAdd", async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
        if(await client.mongo_quick.has(`welcome-type-${member.guild.id}`) === false) return;

        const channel = member.guild.channels.cache.get(data.Channel);

        if(await client.mongo_quick.get(`welcome-type-${member.guild.id}`) === "simple") {

          let  bg = 'https://cdn.discordapp.com/attachments/850808002545319957/859359637106065408/bg.png'
          let  avatar = member.user.displayAvatarURL({ format:  "png" })
          let  text1 = "welcome"
          let  text2 = member.user.tag
          let  text3 = `You're the ${member.guild.memberCount}th member`
          let  color = '#ffffff'
          const  options = {
              font:  "Shadows Into Light",
              attachmentName:  `welcome-${member.id}`,
              text1_fontSize: 80,
              text2_fontSize: 50,
              text3_fontSize: 30
          }
          const image = await  ultrax.welcomeImage(bg, avatar, text1, text2, text3, color, options)
          channel.send({ files: [image] });

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