const client = require('../index');
const Schema = require('../models/invites');
const { MessageEmbed } = require("discord.js");
const  ultrax = require("ultrax")
ultrax.inviteLogger(client);

client.on('inviteJoin', (member, invite, inviter) => {
  Schema.findOne({ Guild: member.guild.id }, async(e, data) => {
    if(!data) return;
    const channellog = member.guild.channels.cache.get(data.Channel);
    const embed = new MessageEmbed()
      .setAuthor(`${member.user.tag} joined!`, member.user.displayAvatarURL())
      .addField("Information", [
        `➤ **Code:** \`${invite.code}\``,
        `  ➤ **Created by:** \`${inviter.tag}\``,
        `  ➤ **Uses:** \`${invite.uses}\``,
        ].join('\n'))
        .setColor("BLUE");
    channellog.send({ embeds: [embed] });
  });
});
