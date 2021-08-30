const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const progressbar = require('string-progressbar');
const canvacord = require("canvacord");
const Levels = require('discord-xp');
const db = require('quick.db');

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
            let [ description ] = args;
            let status;
            if(description) {
                if(description === client.user.id) {
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
                    const guild = client.guilds.cache.get(interaction.guild.id)
                    const user_find = guild.members.cache.get(description)
                    const user = await Levels.fetch(description, interaction.guild.id, true)
                    if (!user) return interaction.followUp("That user dont have xp.", true)
                    try {
                      status = user_find.presence.status
                    } catch(err) {
                      status = "offline"
                    }
                    const rank = new canvacord.Rank()
                        .setAvatar(user_find.user.displayAvatarURL({format: 'png', size: 512}))
                        .setCurrentXP(user.xp)
                        .setRequiredXP(Levels.xpFor(user.level + 1))
                        .setRank(user.position)
                        .setLevel(user.level)
                        .setStatus(status)
                        .setProgressBar("#FFFFFF")
                        .setUsername(user_find.user.username)
                        .setDiscriminator(user_find.user.discriminator);
                    rank.build()
                      .then(data => {
                        const attachment = new MessageAttachment(data, "RankCard.png");
                        interaction.followUp({ files: [attachment] });
                      })
                }
            } else {
              const user = await Levels.fetch(interaction.member.user.id, interaction.guild.id, true)
              if (!user) return interaction.followUp("You dont have xp. try to send some messages.", true)
              try {
                status = interaction.member.presence.status
              } catch(err) {
                status = "offline"
              }
              const rank = new canvacord.Rank()
                  .setAvatar(interaction.member.user.displayAvatarURL({format: 'png', size: 512}))
                  .setCurrentXP(user.xp)
                  .setRequiredXP(Levels.xpFor(user.level + 1))
                  .setRank(user.position)
                  .setLevel(user.level)
                  .setStatus(status)
                  .setProgressBar("#FFFFFF")
                  .setUsername(interaction.member.user.username)
                  .setDiscriminator(interaction.member.user.discriminator);
              rank.build()
                .then(data => {
                  const attachment = new MessageAttachment(data, "RankCard.png");
                  interaction.followUp({ files: [attachment] });
                })
            }
          } else {
            return interaction.followUp("XP system is disabled on this server!", true);
          }

    },
};
