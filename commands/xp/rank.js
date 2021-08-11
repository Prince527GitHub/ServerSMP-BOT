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
        let mentioned_user = message.mentions.members.first();
        if(mentioned_user) {
          const user = await Levels.fetch(mentioned_user.id, message.guild.id, true)
          const neededXp = Levels.xpFor(parseInt(user.level) + 1);
          if (!user) return message.reply("That user dont have xp.")
          const rank = new canvacord.Rank()
              .setAvatar(mentioned_user.user.displayAvatarURL({format: 'png', size: 512}))
              .setCurrentXP(user.xp)
              .setRequiredXP(Levels.xpFor(user.level + 1))
              .setRank(user.position)
              .setLevel(user.level)
              .setStatus(mentioned_user.presence.status)
              .setProgressBar("#FFFFFF")
              .setUsername(mentioned_user.user.username)
              .setDiscriminator(mentioned_user.user.discriminator);
          rank.build()
            .then(data => {
              const attachment = new MessageAttachment(data, "RankCard.png");
              message.channel.send(attachment);
            })
        } else {
          const user = await Levels.fetch(message.author.id, message.guild.id, true)
          const neededXp = Levels.xpFor(parseInt(user.level) + 1);
          if (!user) return message.reply("You dont have xp. try to send some messages.")
          const rank = new canvacord.Rank()
              .setAvatar(message.author.displayAvatarURL({format: 'png', size: 512}))
              .setCurrentXP(user.xp)
              .setRequiredXP(Levels.xpFor(user.level + 1))
              .setRank(user.position)
              .setLevel(user.level)
              .setStatus(message.member.presence.status)
              .setProgressBar("#FFFFFF")
              .setUsername(message.author.username)
              .setDiscriminator(message.author.discriminator);
          rank.build()
            .then(data => {
              const attachment = new MessageAttachment(data, "RankCard.png");
              message.channel.send(attachment);
            })
        }
      } else {
        return message.reply("XP system is disabled on this server!");
      }
    }
}
