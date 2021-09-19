const Schema = require('../models/modlogs');
const logs = require("discord-modlogs");
const client = require("../index");

client.on("channelCreate", async (channel) => {
    const data = await Schema.findOne({ Guild: channel.guild.id })
    if(!data) return;
    if(data.chc === true) return;
    logs.chcreate(client, channel, {
      chid: data.Channel,
    });
});

client.on("channelDelete", async (channel) => {
    const data = await Schema.findOne({ Guild: channel.guild.id })
    if(!data) return;
    if(data.chd === true) return;
    logs.chdel(client, channel, {
      chid: data.Channel,
    });
});

client.on("channelPinsUpdate", async (channel, time) => {
    const data = await Schema.findOne({ Guild: channel.guild.id })
    if(!data) return;
    if(data.chpu === true) return;
    logs.chPinsUpdate(client, channel, time, {
      chid: data.Channel,
    });
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
    const data = await Schema.findOne({ Guild: oldChannel.guild.id })
    if(!data) return;
    if(data.chu === true) return;
    logs.chUpdate(client, oldChannel, newChannel, {
      chid: data.Channel,
    });
});

client.on("emojiDelete", async (emoji) => {
    const data = await Schema.findOne({ Guild: emoji.guild.id })
    if(!data) return;
    if(data.ed === true) return;
    logs.edel(client, emoji, {
      chid: data.Channel,
    });
});

client.on("emojiCreate", async (emoji) => {
    const data = await Schema.findOne({ Guild: emoji.guild.id })
    if(!data) return;
    if(data.ec === true) return;
    logs.eCreate(client, emoji, {
      chid: data.Channel,
    });
});

client.on("emojiUpdate", async (olEemoji, newEmoji) => {
    const data = await Schema.findOne({ Guild: olEemoji.guild.id })
    if(!data) return;
    if(data.eu === true) return;
    logs.eUpdate(client, olEemoji, newEmoji, {
      chid: data.Channel,
    });
});

client.on("guildBanAdd", async (ban) => {
    const data = await Schema.findOne({ Guild: ban.guild.id })
    if(!data) return;
    if(data.gba === true) return;
    logs.guildBanAdd(client, ban, {
      chid: data.Channel,
    });
});

client.on("guildBanRemove", async (ban) => {
    const data = await Schema.findOne({ Guild: ban.guild.id })
    if(!data) return;
    if(data.gbr === true) return;
    logs.guildBanRemove(client, ban, {
      chid: data.Channel,
    });
});

client.on("guildMemberAdd", async (member) => {
    const data = await Schema.findOne({ Guild: member.guild.id })
    if(!data) return;
    if(data.gma === true) return;
    logs.guildMemberAdd(client, member, {
      chid: data.Channel,
    });
});

client.on("guildMemberRemove", async (member) => {
    const data = await Schema.findOne({ Guild: member.guild.id })
    if(!data) return;
    if(data.gmr === true) return;
    logs.guildMemberRemove(client, member, {
      chid: data.Channel,
    });
});

client.on("guildMemberChunk", async (members, guild) => {
    const data = await Schema.findOne({ Guild: members.guild.id })
    if(!data) return;
    if(data.gmc === true) return;
    logs.guildMemberChunk(client, guild, members, {
      chid: data.Channel,
    });
  });

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    const data = await Schema.findOne({ Guild: oldMember.guild.id })
    if(!data) return;
    if(data.gmu === true) return;
    logs.guildMemberUpdate(client, oldMember, newMember, {
      chid: data.Channel,
    });
});
