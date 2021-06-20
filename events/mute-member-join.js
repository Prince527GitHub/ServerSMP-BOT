const Client = require('../index');
const Schema = require('../models/mute');

Client.on("guildMemberAdd", async(member) => {
    const data = await Schema.findOne({ Guild: member.guild.id });
    if(!data) return;
    const user = data.Users.findIndex((prop) => prop === member.id);
    if(user === -1) return;
    const role = member.guild.roles.cache.find((role) => role.name.toLowerCase() === "muted");
    member.roles.add(role.id);
})