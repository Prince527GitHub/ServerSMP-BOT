const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'update',
    description : "The new update :(.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send({ embeds: [
            new MessageEmbed()
                .setTitle("ServerSMP - BOT [ MEGA UPDATE ]")
                .setDescription("`ServerSMP - BOT` has updated to `discord.js v13` and a lot of changes happened.")
                .addField("Pros", "1. The bot is easy to use\n2. And is better on my site")
                .addField("Cons", "1. All data will be deleted for `welcome`, `xp`\n2. Some databases where changed so the old data will be deleted")
                .setColor("BLUE")
                .setTimestamp()
        ]});
    }
}