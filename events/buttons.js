const userRankcard = require("../models/user-rankcard");
const SchemaModLogs = require("../models/modlogs");
const simplydjs = require('simply-djs');
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
  if(interaction.isButton()) {
      if(interaction.customId === "modlog-chc") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.chc === true) {
                      data.chc = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `channelCreate` modlog.", ephemeral: true })
                  } else {
                      data.chc = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `channelCreate` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-chd") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.chd === true) {
                      data.chd = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `channelDelete` modlog.", ephemeral: true })
                  } else {
                      data.chd = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `channelDelete` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-chpu") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.chpu === true) {
                      data.chpu = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `channelPinsUpdate` modlog.", ephemeral: true })
                  } else {
                      data.chpu = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `channelPinsUpdate` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-chu") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.chu === true) {
                      data.chu = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `channelUpdate` modlog.", ephemeral: true })
                  } else {
                      data.chu = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `channelUpdate` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-ed") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.ed === true) {
                      data.ed = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `emojiDelete` modlog.", ephemeral: true })
                  } else {
                      data.ed = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `emojiDelete` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-ec") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.ec === true) {
                      data.ec = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `emojiCreate` modlog.", ephemeral: true })
                  } else {
                      data.ec = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `emojiCreate` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-eu") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.eu === true) {
                      data.eu = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `emojiUpdate` modlog.", ephemeral: true })
                  } else {
                      data.eu = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `emojiUpdate` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-gba") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.gba === true) {
                      data.gba = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `guildBanAdd` modlog.", ephemeral: true })
                  } else {
                      data.gba = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `guildBanAdd` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-gbr") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.gbr === true) {
                      data.gbr = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `guildBanRemove` modlog.", ephemeral: true })
                  } else {
                      data.gbr = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `guildBanRemove` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-gma") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.gma === true) {
                      data.gma = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `guildMemberAdd` modlog.", ephemeral: true })
                  } else {
                      data.gma = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `guildMemberAdd` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-gmr") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.gmr === true) {
                      data.gmr = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `guildMemberRemove` modlog.", ephemeral: true })
                  } else {
                      data.gmr = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `guildMemberRemove` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-gmc") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.gmc === true) {
                      data.gmc = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `guildMemberChunk` modlog.", ephemeral: true })
                  } else {
                      data.gmc = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `guildMemberChunk` modlog.", ephemeral: true })
                  }
              }
          });

      } else if(interaction.customId === "modlog-gmu") {
          if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
          SchemaModLogs.findOne({ Guild: interaction.guild.id }, async(err, data) => {
              if(data) {
                  if(data.gmu === true) {
                      data.gmu = false;
                      data.save();
                      interaction.reply({ content: "Turn **on** `guildMemberUpdate` modlog.", ephemeral: true })
                  } else {
                      data.gmu = true;
                      data.save();
                      interaction.reply({ content: "Turn **off** `guildMemberUpdate` modlog.", ephemeral: true })
                  }
                }
          });

      } else if(interaction.customId === "rank-card-yes") {
            if(interaction.channel.id !== process.env.RANKIMAG) return interaction.reply("HELP - Channel id")
            if(await client.db_json.has(`rankcard-${interaction.message.id}`) === true) {
                const userId = await client.db_json.get(`rankcard-${interaction.message.id}`);
                userRankcard.findOne({ User: userId }, async(err, data) => {
                    if(!data) return interaction.reply("HELP - No data in Mongoose")
                    if(data) {
                        if(await client.db_json.has(`rank-card-${userId}`) === true) {
                            data.Background = await client.db_json.get(`rank-card-${userId}`);
                            data.save().then(async() => {
                                client.users.cache.get(userId).send("Your RankCard image was accepted!");
                                await client.db_json.delete(`rankcard-${interaction.message.id}`);
                                await client.db_json.delete(`rank-card-${userId}`);
                                interaction.message.delete(interaction.message.id);
                            });
                        }
                    }
                })
            } else return interaction.reply("HELP - No data in json")

        } else if(interaction.customId === "rank-card-deny") {
            if(interaction.channel.id !== process.env.RANKIMAG) return interaction.reply("HELP - Channel id")
            if(await client.db_json.has(`rankcard-${interaction.message.id}`) === true) {
                const userId = await client.db_json.get(`rankcard-${interaction.message.id}`);
                await client.users.cache.get(userId).send("Your RankCard image was denyed!");
                await client.db_json.delete(`rankcard-${interaction.message.id}`);
                await client.db_json.delete(`rank-card-${userId}`);
                interaction.channel.fetchMessage(interaction.message.id).then(msg => msg.delete());
            } else return interaction.reply("HELP - No data in json")

        }

    }

    simplydjs.clickBtn(interaction)
});
