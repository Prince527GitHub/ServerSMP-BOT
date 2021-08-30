const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Levels = require('discord-xp');
const db = require('quick.db');

module.exports = {
    name: 'leaderboard',
    description : "Show who has the most xp/level on you're server.",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
        if(db.has(`xp-${interaction.guild.id}`)=== false) {
            const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10);
            if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
            const lb = leaderboard.map(e => `**${e.position}**. *${e.username}#${e.discriminator}*\nLevel: \`${e.level}\`\nXP: \`${e.xp.toLocaleString()}\``);
            interaction.followUp({ embeds: [
                new MessageEmbed()
                    .setTitle("**Leaderboard**:")
                    .setDescription(`${lb.join("\n\n")}`)
                    .setColor("RANDOM")
            ]});
          } else return interaction.followUp("XP system is disabled on this server!", true);
    },
};