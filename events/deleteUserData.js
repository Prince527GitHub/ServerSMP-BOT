const client = require('../index');
const Levels = require("discord-xp");

client.on('guildMemberRemove', async(guildMemberRemove) => {
    if (guildMemberRemove.bot) return;

    // XP
    Levels.deleteUser(guildMemberRemove.id, guildMemberRemove.guild.id)

});
