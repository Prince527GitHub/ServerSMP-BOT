const Client = require('../index');
const { MessageEmbed } = require('discord.js');

Client.on("guildCreate", (guild) => {
    let channelToSend;
    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel;
    });
    if(!channelToSend) return;
    channelToSend.send(
            new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
                .setDescription("Thanks for inviting ServerSMP - BOT to your server!\nThe bot prefix is `-` and for the list of commands do `-help`")
                .setTimestamp()
        )
});