const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const canvacord = require("canvacord");
const Levels = require('discord-xp');
const db = require('quick.db');

module.exports = {
    name: 'rank',
    category : 'XP',
    description : "Show's you're rank card (xp/level).",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      if(db.has(`xp-${message.guild.id}`)=== false) {
        const user = await Levels.fetch(message.author.id, message.guild.id)
        const neededXp = Levels.xpFor(parseInt(user.level) + 1);
        if (!user) return message.reply("You dont have xp. try to send some messages.")
        const rank = new canvacord.Rank()
          .setAvatar(message.author.displayAvatarURL({ dynamic: false, format: 'png' }))
          .setRank(1, 'RANK', false)
          .setLevel(user.level)
          .setCurrentXP(user.xp)
          .setRequiredXP(neededXp)
          .setStatus(message.member.presence.status)
          .setProgressBar("#FFFFFF", "COLOR")
          .setUsername(message.author.username)
          .setDiscriminator(message.author.discriminator);
        rank.build()
          .then(data => {
            const attachment = new MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
          })
      } else {
        return message.reply("XP system is disabled on this server!");
      }
    }
}
