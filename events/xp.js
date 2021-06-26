const client = require('../index');
const Levels = require('discord-xp');

client.on('message', async(message) => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const randomXp = Math.floor(Math.random() * 9) + 1; //Random amont of XP until the number you want + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        //message.channel.send(`${message.author.username} leveled up to ${user.level}! Keep it going!`);
    }
})
