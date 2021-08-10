const client = require('../index');
const { MessageEmbed } = require('discord.js');

client.on("guildCreate", async(guild) => {
    let channelToSend;
    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel;
    });
    if(!channelToSend) return;
    channelToSend.send(
            new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
                .setDescription(`Thanks for inviting ${client.user.username} to your server!\nThe bot prefix is \`${process.env.PREFIX}\` and for the list of commands do \`${process.env.PREFIX}help\``)
                .setTimestamp()
        )
    console.log(`${client.user.username} has joined ${guild.name} witch makes the total number of guilds ${client.guilds.cache.size}`);
});
