const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const progressbar = require('string-progressbar');
const canvacord = require("canvacord");
const Levels = require('discord-xp');
const db = require('quick.db');
const guildRankcard = require("../../models/guild-rankcard");
const userRankcard = require("../../models/user-rankcard");
const TextEssence = require('text-essence');

module.exports = {
    name: "rank",
    usage: "[@user (or not)]",
    description: "Show's you're rank card (xp/level).",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(db.has(`xp-${message.guild.id}`)=== false) {
            let mentioned_user = message.mentions.members.first();
            let status;
            if(mentioned_user) {
              if(mentioned_user.id === client.user.id) {
                const user = await Levels.fetch(message.member.user.id, message.guild.id, true)
                if (!user) return message.followUp("You dont have xp. try to send some messages.", true)
                var total = Levels.xpFor(user.level + 1);
                var current = user.xp;
                let bar = progressbar.filledBar(total, current, 40, "□", "■")[0];
                const embed = new MessageEmbed()
                  .setTitle(`${message.member.user.username}'s Rank`)
                  .setDescription(`**Rank**: \`${user.position}\`\n**Level**: \`${user.level}\`\n**XP**: \`${bar} ${current}/${total}\``)
                  .setThumbnail(message.member.user.displayAvatarURL({format: 'png', size: 512}))
                  .setColor("RANDOM")
                message.channel.send({ embeds: [embed] })
              } else {
                try {
                  status = mentioned_user.presence.status
                } catch(err) {
                  status = "offline"
                }
                let progresscolor;
                let background;
                let statustype;
                await userRankcard.findOne({ User: mentioned_user.id }, async(err, data) => {
                  if(data) {
                    progresscolor = data.ProgressBar
                    statustype = data.StatusStyle
                    if(data.StatusType !== "false") {
                      status = data.StatusType
                    }
                    if(data.Background === "default") {
                      background = "default"
                    } else {
                      background = data.Background
                    }
                  } else {
                    await guildRankcard.findOne({ Guild: mentioned_user.guild.id }, async(err, data) => {
                      if(data) {
                        if(data.ProgressOption === true) {
                          progresscolor = data.ProgressBar
                        }
                        if(data.BackgroundOption === true) {
                          if(data.Background === "default") {
                            background = "default"
                          } else {
                            background = data.Background
                          }
                        }
                        statustype = data.StatusStyle
                      } else {
                        progresscolor = "#FFFFFF"
                        background = "default"
                      }
                    })
                  }
                })
                const user = await Levels.fetch(mentioned_user.id, message.guild.id, true)
                if (!user) return message.reply("That user dont have xp.")
                const name = TextEssence.essence(mentioned_user.user.username);
                let rank;
                if(background !== "default") {
                  rank = new canvacord.Rank()
                    .setAvatar(mentioned_user.user.displayAvatarURL({format: 'png', size: 512}))
                    .setBackground("IMAGE", background)
                    .setCurrentXP(user.xp)
                    .setRequiredXP(Levels.xpFor(user.level + 1))
                    .setRank(user.position)
                    .setLevel(user.level)
                    .setStatus(status, statustype)
                    .setProgressBar(progresscolor)
                    .renderEmojis(true)
                    .setOverlay("#FFFFFF", 0, false)
                    .setUsername(name)
                    .setDiscriminator(mentioned_user.user.discriminator);
                } else {
                  rank = new canvacord.Rank()
                    .setAvatar(mentioned_user.user.displayAvatarURL({format: 'png', size: 512}))
                    .setCurrentXP(user.xp)
                    .setRequiredXP(Levels.xpFor(user.level + 1))
                    .setRank(user.position)
                    .setLevel(user.level)
                    .setStatus(status, statustype)
                    .setProgressBar(progresscolor)
                    .renderEmojis(true)
                    .setUsername(name)
                    .setDiscriminator(mentioned_user.user.discriminator);
                }
                rank.build()
                .then(data => {
                  const attachment = new MessageAttachment(data, "RankCard.png");
                  message.channel.send({ files: [attachment] });
                })
              }
            } else {
              try {
                status = message.member.presence.status
              } catch(err) {
                status = "offline"
              }
              let progresscolor;
              let background;
              let statustype;
              await userRankcard.findOne({ User: message.author.id }, async(err, data) => {
                if(data) {
                  progresscolor = data.ProgressBar
                  statustype = data.StatusStyle
                  if(data.StatusType !== "false") {
                    status = data.StatusType
                  }
                  if(data.Background === "default") {
                    background = "default"
                  } else {
                    background = data.Background
                  }
                } else {
                  await guildRankcard.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(data) {
                      if(data.ProgressOption === true) {
                        progresscolor = data.ProgressBar
                      }
                      if(data.BackgroundOption === true) {
                        if(data.Background === "default") {
                          background = "default"
                        } else {
                          background = data.Background
                        }
                      }
                      statustype = data.StatusStyle
                    } else {
                      progresscolor = "#FFFFFF"
                      background = "default"
                    }
                  })
                }
              })
              const user = await Levels.fetch(message.author.id, message.guild.id, true)
              if (!user) return message.reply("You dont have xp. try to send some messages.")
              const name = TextEssence.essence(message.author.username);
              let rank;
              if(background !== "default") {
                rank = new canvacord.Rank()
                  .setAvatar(message.author.displayAvatarURL({format: 'png', size: 512}))
                  .setBackground("IMAGE", background)
                  .setCurrentXP(user.xp)
                  .setRequiredXP(Levels.xpFor(user.level + 1))
                  .setRank(user.position)
                  .setLevel(user.level)
                  .setStatus(status, statustype)
                  .setProgressBar(progresscolor)
                  .setOverlay("#FFFFFF", 0, false)
                  .renderEmojis(true)
                  .setUsername(name)
                  .setDiscriminator(message.author.discriminator);
              } else {
                rank = new canvacord.Rank()
                  .setAvatar(message.author.displayAvatarURL({format: 'png', size: 512}))
                  .setCurrentXP(user.xp)
                  .setRequiredXP(Levels.xpFor(user.level + 1))
                  .setRank(user.position)
                  .setLevel(user.level)
                  .setStatus(status, statustype)
                  .setProgressBar(progresscolor)
                  .renderEmojis(true)
                  .setUsername(name)
                  .setDiscriminator(message.author.discriminator);
              }
              rank.build()
              .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                message.channel.send({ files: [attachment] });
              })
            }
          } else {
            return message.reply("XP system is disabled on this server!");
          }
    },
};
