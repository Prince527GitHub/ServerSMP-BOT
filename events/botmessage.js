const client = require('../index');
const { MessageEmbed } = require('discord.js');

client.on("guildCreate", async(guild) => {
    let channelToSend;
    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel;
    });
    if(!channelToSend) return;
    channelToSend.send({ embeds: [
        new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setDescription(`Thanks for inviting ${client.user.username} to your server!\nThe bot prefix is \`${process.env.PREFIX}\` and for the list of commands do \`${process.env.PREFIX}help\``)
            .setTimestamp()
    ]})
});
