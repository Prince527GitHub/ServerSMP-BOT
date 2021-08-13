const client = require('../index');
const Levels = require('discord-xp');

client.on('message', async(message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
    if(await client.mongo_quick.has(`xp-${message.guild.id}`)=== false) {
      const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
      const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
      if (hasLeveledUp) {
          if(await client.mongo_quick.has(`xp-ch-on-${message.guild.id}`)=== true) {
            const channel = message.guild.channels.cache.get(await client.mongo_quick.get(`xp-channel-${message.guild.id}`));
            const user = await Levels.fetch(message.author.id, message.guild.id);
            channel.send(`${message.author} leveled up to ${user.level}! Keep it going!`);
          } else {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            message.channel.send(`${message.author.username} leveled up to ${user.level}! Keep it going!`);
          }
        }
    }
})
