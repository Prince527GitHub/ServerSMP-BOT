const { MessageEmbed, Message, Client } = require('discord.js');
const canvacord = require("canvacord");
const Levels = require('discord-xp');
const db = require('quick.db');

module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    category : 'XP',
    description : "Show who has the most xp/level on you're server.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      if(db.has(`xp-${message.guild.id}`)=== false) {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard);
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
        message.channel.send(`${lb.join("\n\n")}`);
      } else {
        return message.reply("XP system is disabled on this server!");
      }
    }
}
