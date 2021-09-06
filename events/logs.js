const Schema = require('../models/modlogs');
const logs = require("discord-modlogs");
const client = require("../index");

client.on("channelCreate", async (channel) => {
    const data = await Schema.findOne({ Guild: channel.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-chc-${channel.guild.id}`) === true) return;
    logs.chcreate(client, channel, {
      chid: data.Channel,
    });
});
  
client.on("channelDelete", async (channel) => {
    const data = await Schema.findOne({ Guild: channel.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-chd-${channel.guild.id}`) === true) return;
    logs.chdel(client, channel, {
      chid: data.Channel,
    });
});

client.on("channelPinsUpdate", async (channel, time) => {
    const data = await Schema.findOne({ Guild: channel.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-chpu-${channel.guild.id}`) === true) return;
    logs.chPinsUpdate(client, channel, time, {
      chid: data.Channel,
    });
});

client.on("channelUpdate", async (oldChannel, newChannel) => {
    const data = await Schema.findOne({ Guild: oldChannel.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-chu-${oldChannel.guild.id}`) === true) return;
    logs.chUpdate(client, oldChannel, newChannel, {
      chid: data.Channel,
    });
});

client.on("emojiDelete", async (emoji) => {
    const data = await Schema.findOne({ Guild: emoji.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-ed-${emoji.guild.id}`) === true) return;
    logs.edel(client, emoji, {
      chid: data.Channel,
    });
});

client.on("emojiCreate", async (emoji) => {
    const data = await Schema.findOne({ Guild: emoji.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-ec-${emoji.guild.id}`) === true) return;
    logs.eCreate(client, emoji, {
      chid: data.Channel,
    });
});

client.on("emojiUpdate", async (olEemoji, newEmoji) => {
    const data = await Schema.findOne({ Guild: olEemoji.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-eu-${olEemoji.guild.id}`) === true) return;
    logs.eUpdate(client, olEemoji, newEmoji, {
      chid: data.Channel,
    });
});

client.on("guildBanAdd", async (ban) => {
    const data = await Schema.findOne({ Guild: ban.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-gba-${ban.guild.id}`) === true) return;
    logs.guildBanAdd(client, ban, {
      chid: data.Channel,
    });
});

client.on("guildBanRemove", async (ban) => {
    const data = await Schema.findOne({ Guild: ban.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-gbr-${ban.guild.id}`) === true) return;
    logs.guildBanRemove(client, ban, {
      chid: data.Channel,
    });
});
  
client.on("guildMemberAdd", async (member) => {
    const data = await Schema.findOne({ Guild: member.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-gma-${member.guild.id}`) === true) return;
    logs.guildMemberAdd(client, member, {
      chid: data.Channel,
    });
});

client.on("guildMemberRemove", async (member) => {
    const data = await Schema.findOne({ Guild: member.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-gmr-${member.guild.id}`) === true) return;
    logs.guildMemberRemove(client, member, {
      chid: data.Channel,
    });
});

client.on("guildMemberChunk", async (members, guild) => {
    const data = await Schema.findOne({ Guild: members.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-gmc-${members.guild.id}`) === true) return;
    logs.guildMemberChunk(client, guild, members, {
      chid: data.Channel,
    });
  });  

client.on("guildMemberUpdate", async (oldMember, newMember) => {
    const data = await Schema.findOne({ Guild: oldMember.guild.id })
    if(!data) return;
    if(await client.mongo_quick.has(`modlog-gmu-${oldMember.guild.id}`) === true) return;
    logs.guildMemberUpdate(client, oldMember, newMember, {
      chid: data.Channel,
    });
});