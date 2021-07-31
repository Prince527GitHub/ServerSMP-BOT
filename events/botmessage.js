const Client = require('../index');
const { MessageEmbed } = require('discord.js');

Client.on("guildCreate", (guild) => {
    let channelToSend;
    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel;
    });
    if(!channelToSend) return;
    const p = client.prefix(message)
    channelToSend.send(
            new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
                .setDescription(`Thanks for inviting ${client.user.username} to your server!\nThe bot prefix is ${p} and for the list of commands do ${p}help`)
                .setTimestamp()
        )
});
