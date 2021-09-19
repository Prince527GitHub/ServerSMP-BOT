const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const progressbar = require('string-progressbar');
const canvacord = require("canvacord");
const Levels = require('discord-xp');
const db = require('quick.db');
const guildRankcard = require("../../models/guild-rankcard");
const userRankcard = require("../../models/user-rankcard");

module.exports = {
    name: "rank",
    description: "Show's you're rank card (xp/level).",
    options: [
        {
          name: "user",
          description: "user you want to get rank.",
          type: "USER",
          required: false,
        }
      ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

      if(db.has(`xp-${interaction.guild.id}`)=== false) {
          let mentioned_user = interaction.options.getUser("user");
          let status;
          if(mentioned_user) {
            if(mentioned_user.id === client.user.id) {
              const user = await Levels.fetch(interaction.member.user.id, interaction.guild.id, true)
              if (!user) return interaction.followUp("You dont have xp. try to send some messages.", true)
              var total = Levels.xpFor(user.level + 1);
              var current = user.xp;
              let bar = progressbar.filledBar(total, current, 40, "□", "■")[0];
              const embed = new MessageEmbed()
                .setTitle(`${interaction.member.user.username}'s Rank`)
                .setDescription(`**Rank**: \`${user.position}\`\n**Level**: \`${user.level}\`\n**XP**: \`${bar} ${current}/${total}\``)
                .setThumbnail(interaction.member.user.displayAvatarURL({format: 'png', size: 512}))
                .setColor("RANDOM")
              interaction.followUp({ embeds: [embed] })
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
              const user = await Levels.fetch(mentioned_user.id, interaction.guild.id, true)
              if (!user) return interaction.followUp("That user dont have xp.")
              let rank;
              if(background !== "default") {
                rank = new canvacord.Rank()
                  .setAvatar(mentioned_user.displayAvatarURL({format: 'png', size: 512}))
                  .setBackground("IMAGE", background)
                  .setCurrentXP(user.xp)
                  .setRequiredXP(Levels.xpFor(user.level + 1))
                  .setRank(user.position)
                  .setLevel(user.level)
                  .setStatus(status, statustype)
                  .setProgressBar(progresscolor)
                  .renderEmojis(true)
                  .setOverlay("#FFFFFF", 0, false)
                  .setUsername(mentioned_user.username)
                  .setDiscriminator(mentioned_user.discriminator);
              } else {
                rank = new canvacord.Rank()
                  .setAvatar(mentioned_user.displayAvatarURL({format: 'png', size: 512}))
                  .setCurrentXP(user.xp)
                  .setRequiredXP(Levels.xpFor(user.level + 1))
                  .setRank(user.position)
                  .setLevel(user.level)
                  .setStatus(status, statustype)
                  .setProgressBar(progresscolor)
                  .renderEmojis(true)
                  .setUsername(mentioned_user.username)
                  .setDiscriminator(mentioned_user.discriminator);
              }
              rank.build()
              .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                interaction.followUp({ files: [attachment] });
              })
            }
          } else {
            try {
              status = interaction.member.presence.status
            } catch(err) {
              status = "offline"
            }
            let progresscolor;
            let background;
            let statustype;
            await userRankcard.findOne({ User: interaction.member.user.id }, async(err, data) => {
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
                await guildRankcard.findOne({ Guild: interaction.guild.id }, async(err, data) => {
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
            const user = await Levels.fetch(interaction.member.user.id, interaction.guild.id, true)
            if (!user) return interaction.followUp("You dont have xp. try to send some messages.")
            let rank;
            if(background !== "default") {
              rank = new canvacord.Rank()
                .setAvatar(interaction.member.user.displayAvatarURL({format: 'png', size: 512}))
                .setBackground("IMAGE", background)
                .setCurrentXP(user.xp)
                .setRequiredXP(Levels.xpFor(user.level + 1))
                .setRank(user.position)
                .setLevel(user.level)
                .setStatus(status, statustype)
                .setProgressBar(progresscolor)
                .setOverlay("#FFFFFF", 0, false)
                .renderEmojis(true)
                .setUsername(interaction.member.user.username)
                .setDiscriminator(interaction.member.user.discriminator);
            } else {
              rank = new canvacord.Rank()
                .setAvatar(interaction.member.user.displayAvatarURL({format: 'png', size: 512}))
                .setCurrentXP(user.xp)
                .setRequiredXP(Levels.xpFor(user.level + 1))
                .setRank(user.position)
                .setLevel(user.level)
                .setStatus(status, statustype)
                .setProgressBar(progresscolor)
                .renderEmojis(true)
                .setUsername(interaction.member.user.username)
                .setDiscriminator(interaction.member.user.discriminator);
            }
            rank.build()
            .then(data => {
              const attachment = new MessageAttachment(data, "RankCard.png");
              interaction.followUp({ files: [attachment] });
            })
          }
        } else {
          return interaction.followUp("XP system is disabled on this server!");
        }
    },
};
