const client = require('../index');
const Levels = require("discord-xp");
const economy = require('../models/economy');

client.on('guildMemberRemove', async(guildMemberRemove) => {
    if (guildMemberRemove.bot) return;

    // Economy
    economy.findOne({ id: guildMemberRemove.id }, async(err, data) => {
        if(data) data.delete();
    })

    // XP
    Levels.deleteUser(guildMemberRemove.id, guildMemberRemove.guild.id)
    
});