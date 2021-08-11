const client = require('../index');
const Levels = require('discord-xp');

client.on('guildMemberRemove', async(guildMemberRemove) => {
  if (guildMemberRemove.bot) return;
  let user = await Levels.fetch(guildMemberRemove.id, guildMemberRemove.guild.id);
  if(user) {
    Levels.deleteUser(guildMemberRemove.id, guildMemberRemove.guild.id);
  } else {
    return;
  }
});
