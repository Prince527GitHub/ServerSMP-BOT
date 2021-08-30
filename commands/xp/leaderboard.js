const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const Levels = require('discord-xp');
const db = require('quick.db');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    description : "Show who has the most xp/level on you're server.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(db.has(`xp-${message.guild.id}`)=== false) {
            const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
            if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
            const lb = leaderboard.map(e => `**${e.position}**. *${e.username}#${e.discriminator}*\nLevel: \`${e.level}\`\nXP: \`${e.xp.toLocaleString()}\``);
            message.channel.send({ embeds: [
                new MessageEmbed()
                    .setTitle("**Leaderboard**:")
                    .setDescription(`${lb.join("\n\n")}`)
                    .setColor("RANDOM")
            ]});
          } else return message.reply("XP system is disabled on this server!");
    },
};