const client = require('../index');

client.on("guildMemberAdd", async(member) => {
    if(await client.mongo_quick.has(`autorole-${member.guild.id}`) === true) {
        const rolefind = member.guild.roles.cache.find(r => r.id === client.mongo_quick.get(`autorole-${member.guild.id}`));
        member.roles.add(rolefind);
    }
})