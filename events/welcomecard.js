const Client = require('../index');
const Schema = require('../models/welcome');
const { MessageAttachment } = require('discord.js');
const { drawCard } = require('discord-welcome-card');
const botdash = require('botdash.pro');
const dashboard = new botdash.APIclient("3856da55-f3b3-462f-9186-0bf72c9b35a7");

Client.on("guildMemberAdd", async(member) => {
    Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
        if(!data) return;
        const themes = await dashboard.getVal(member.guild.id, "themes");
        const user = member.user;
          const image = await drawCard({
              blur: true,
              title: `Welcome to ${member.guild.name}`,
              theme: themes,
              text: `${user.username}#${user.discriminator}`,
              subtitle: `MemberCount: ${member.guild.memberCount}`,
              rounded: true,
              border: true,
              avatar: user.displayAvatarURL({ format: 'png' })
          });
          const attachment = new MessageAttachment(image, 'welcome.png');
          const channel = member.guild.channels.cache.get(data.Channel);
          channel.send(attachment);
      });
})