const { MessageEmbed, Message, Client, MessageReaction, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const { blacklistedwords } = require('../../collection/index');
const SchemaChatBot = require('../../models/chatbot-channel');
const SchemaBlacklist = require('../../models/blackwords');
const SchemaModLogs = require('../../models/modlogs');
const SchemaGoodbye = require('../../models/goodbye');
const SchemaWelcome = require('../../models/welcome');
const { drawCard } = require('discord-welcome-card');
const prefixSchema = require('../../models/prefix');
const SchemaGlobal = require('../../models/global');
const SchemaCMD = require('../../models/command');
const Schema = require('../../models/invites');
const { pagination } = require('reconlx');
const db = require('quick.db');

module.exports = {
    name: 'options',
    usage: '[ option 1 | ] [ option 2 ] [ option 3 ] [ option 4 ] { To get a list to the options do the command without options. }',
    description : "Set up some options stuff.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {

    const prefix = await client.prefix(message)

    const query = args[0]?.toLowerCase()
    const options = args[1]?.toLowerCase()

    if(!query) {
        const embed = new MessageEmbed()
            .setTitle("Options - Schema")
            .setDescription(`
                **Options**:
                \`${prefix}options list\`
                **Prefix**:
                \`${prefix}options prefix [ set | reset ] [ new prefix | nothing ]\`
                **Invite**:
                \`${prefix}options invite [ remove | set ] [ nothing | #channel ]\`
                **XP**:
                \`${prefix}options xp [ off | on | channel ] [ set | remove ] [ #channel | nothing ]\`
                **Captcha**:
                \`${prefix}options captcha [ on | off ]\`
                **NSFW**:
                \`${prefix}options nsfw [ on | off | channel ] [ set | remove ] [ | #channel | nothing ]\`
                **Chatbot**:
                \`${prefix}options chatbot [ set | remove ] [ #channel | nothing ]\`
                **ModLogs**:
                \`${prefix}options modlogs [ remove | set ] [ nothing | #channel ]\`
                **Global**:
                \`${prefix}options global [ set | remove ] [ #channel | nothing ]\`
                **Blacklist**:
                \`${prefix}options blacklist [ add | remove | display ] [ word | word | nothng ]\`
                **Goodbye**:
                \`${prefix}options goodbye [ set | remove | show ] [ { subtitle | title | { dark | sakura | blue | bamboo | desert | code } } | nothing | nothing ] [ text | text | #channel ]\`
                **Welcome**:
                \`${prefix}options welcome [ set | remove ] [ { simple | custom } | nothing ] [ #channel | { dark | sakura | blue | bamboo | desert | code } ] [ nothing | #channel ]\`
                **CMD**:
                \`${prefix}options cmd [ enable | disable ] [ cmd name ]\`
                **Autorole**:
                \`${prefix}options autorole [ on | off ] [ @role | nothing ]\`
            `)
            .setColor("RANDOM")
        const embed2 = new MessageEmbed()
            .setTitle("Options - Exsemple")
            .setDescription(`
                **Options**: list
                \`${prefix}options list\`

                **Prefix**: set
                \`${prefix}options prefix set !\`
                **Prefix**: reset
                \`${prefix}options prefix reset\`

                **Invite**: remove
                \`${prefix}options invite remove\`
                **Invite**: set
                \`${prefix}options invite set #channel\`

                **XP**: off
                \`${prefix}options xp off\`
                **XP**: on
                \`${prefix}options xp on\`
                **XP**: channel set
                \`${prefix}options xp channel set #channel\`
                **XP**: channel remove
                \`${prefix}options xp channel remove\`

                **Captcha**: on
                \`${prefix}options captcha on\`
                **Captcha**: off
                \`${prefix}options captcha off\`

                **NSFW**: off
                \`${prefix}options nsfw off\`
                **NSFW**: on
                \`${prefix}options nsfw on\`
                **NSFW**: channel set
                \`${prefix}options nsfw channel set #channel\`
                **NSFW**: channel remove
                \`${prefix}options nsfw channel remove\`

                **Chatbot**: remove
                \`${prefix}options chatbot remove\`
                **Chatbot**: set
                \`${prefix}options chatbot set #channel\`

                **ModLogs**: remove
                \`${prefix}options modlogs remove\`
                **ModLogs**: set
                \`${prefix}options modlogs set #channel\`

                **Global**: remove
                \`${prefix}options global remove\`
                **Global**: set
                \`${prefix}options global set #channel\`

                **Blacklist**: add
                \`${prefix}options blacklist add fuck\`
                **Blacklist**: remove
                \`${prefix}options blacklist remove fuck\`
                **Blacklist**: display
                \`${prefix}options blacklist display\`

                **Goodbye**: set subtitle
                \`${prefix}options goodbye set subtitle You won't be missed!\`
                **Goodbye**: set title
                \`${prefix}options goodbye set title Goodbye,\`
                **Goodbye**: show
                \`${prefix}options goodbye show\`
                **Goodbye**: set dark
                \`${prefix}options goodbye set dark #channel\`
                **Goodbye**: set sakura
                \`${prefix}options goodbye set sakura #channel\`
                **Goodbye**: set blue
                \`${prefix}options goodbye set blue #channel\`
                **Goodbye**: set bamboo
                \`${prefix}options goodbye set bamboo #channel\`
                **Goodbye**: set desert
                \`${prefix}options goodbye set desert #channel\`
                **Goodbye**: set code
                \`${prefix}options goodbye set code #channel\`
                **Goodbye**: remove
                \`${prefix}options goodbye remove\`

                **Welcome**: set simple
                \`${prefix}options welcome set simple #channel\`
                **Welcome**: set custom dark
                \`${prefix}options welcome set custom dark #channel\`
                **Welcome**: set custom sakura
                \`${prefix}options welcome set custom sakura #channel\`
                **Welcome**: set custom blue
                \`${prefix}options welcome set custom blue #channel\`
                **Welcome**: set custom bamboo
                \`${prefix}options welcome set custom bamboo #channel\`
                **Welcome**: set custom desert
                \`${prefix}options welcome set custom desert #channel\`
                **Welcome**: set custom code
                \`${prefix}options welcome set custom code #channel\`
                **Welcome**: remove
                \`${prefix}options welcome remove\`

                **CMD**: enable
                \`${prefix}options cmd enable skip\`
                **CMD**: disable
                \`${prefix}options cmd disable skip\`

                **Autorole**: on
                \`${prefix}options autorole on @role\`
                **Autorole**: off
                \`${prefix}options autorole off\`
            `)
            .setColor("RANDOM")
        return pagination({
            embeds: [embed, embed2],
            message: message,
            channel: message.channel,
            author: message.author,
            time: 50000,
        })
    }

        if(query === "invite") {
            if(options === "remove") {
                Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                  if(data) data.delete();
                  if(!data) return message.reply("This server has no invite channel!");
                  message.channel.send("Deleted invite channel!");
                })
              } else if(options === "set") {
                const channel = message.mentions.channels.last();
                if(!channel) return message.reply("Please mention a channel!");
                Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(data) {
                        data.Channel = channel.id;
                        data.save();
                    } else {
                        new Schema({
                            Guild: message.guild.id,
                            Channel: channel.id,
                        }).save();
                    }
                    message.reply(`${channel} has been set as the invite channel.`)
                })
              } else return message.reply("Option is not correct!")

        } else if(query === "xp") {
            if(options === "off") {
                if(db.has(`xp-channel-${message.guild.id}`)=== true) {
                    db.delete(`xp-channel-${message.guild.id}`)
                }
                db.set(`xp-${message.guild.id}`, true)
                message.channel.send('Turned off xp commands/system.')
            } else if(options === "on") {
                if(db.has(`xp-${message.guild.id}`)=== false) return message.reply("XP is allready on.")
                db.delete(`xp-${message.guild.id}`)
                message.channel.send('Turned on xp commands/system.')
            } else if(options === "channel") {
                if(args[2].toLowerCase() === "set") {
                    const channel = message.mentions.channels.last();
                    if(!channel) return message.reply("Please mention a channel!");
                    db.set(`xp-channel-${message.guild.id}`, channel.id)
                    message.channel.send(`Turned on xp log channel at ${channel}.`)
                } else if(args[2].toLowerCase() === "remove") {
                    if(db.has(`xp-channel-${message.guild.id}`)=== true) {
                        db.delete(`xp-channel-${message.guild.id}`)
                        message.channel.send('Turned off xp log channel.')
                      } else {
                        message.reply("XP log channel was not set!")
                      }
                } else return message.reply("Option is not correct!")
            } else return message.reply("Option is not correct!")

        } else if(query === "captcha") {
            if(options === "on") {
                if(db.has(`captcha-${message.guild.id}`)=== true) return message.reply("Captcha is allready on.")
                db.set(`captcha-${message.guild.id}`, true)
                message.channel.send('Turned on captcha feature')
            } else if(options === "off") {
                if(db.has(`captcha-${message.guild.id}`)=== false) return message.reply("Captcha is allready off.")
                db.delete(`captcha-${message.guild.id}`)
                message.channel.send('Turned off captcha feature')
            } else return message.reply("Option is not correct!")

        } else if(query === "nsfw") {
            if(options === "on") {
                if(await client.mongo_quick.has(`nsfw-${message.guild.id}`)=== true) return message.reply("NSFW is allreadt on.")
                await client.mongo_quick.set(`nsfw-${message.guild.id}`, true)
                message.channel.send('Turned on NSFW commands.')
            } else if(options === "off") {
                if(await client.mongo_quick.has(`nsfw-${message.guild.id}`)=== false) return message.reply("NSFW is allready off.")
                await client.mongo_quick.remove(`nsfw-${message.guild.id}`)
                if(await client.mongo_quick.has(`nsfw-ch-${message.guild.id}`)=== true) {
                  await client.mongo_quick.remove(`nsfw-ch-${message.guild.id}`)
                }
                message.channel.send('Turned off NSFW commands.')
            } else if(options === "channel") {
                if(args[2].toLowerCase() === "set") {
                    const channel = message.mentions.channels.last();
                    if(!channel) return message.reply("Please mention a channel!");
                    if(await client.mongo_quick.has(`nsfw-${message.guild.id}`)=== false) {
                        await client.mongo_quick.set(`nsfw-${message.guild.id}`, true)
                    }
                    await client.mongo_quick.set(`nsfw-ch-${message.guild.id}`, channel.id)
                    message.channel.send(`Set NSFW channel to ${channel}.`)
                } else if(args[2].toLowerCase() === "remove") {
                    if(await client.mongo_quick.has(`nsfw-ch-${message.guild.id}`)=== true) {
                        await client.mongo_quick.remove(`nsfw-ch-${message.guild.id}`)
                        message.channel.send("Turned off nsfw channel!")
                      } else {
                        message.channel.send("NSFW channel is allready off.")
                      }
                } else return message.reply("Option is not correct!")
            } else return message.reply("Option is not correct!")

        } else if(query === "chatbot") {
            if(options === "set") {
                const channel = message.mentions.channels.last();
                if(!channel) return message.reply("Please mention a channel!");
                SchemaChatBot.findOne({ Guild: message.guild.id }, async(err, data) => {
                  if(data) data.delete();
                  new SchemaChatBot({
                    Guild: message.guild.id,
                    Channel: channel.id,
                  }).save();
                  message.channel.send(`Saved chatbot channel to ${channel}.`);
                })
            } else if(options === "remove") {
                SchemaChatBot.findOne({ Guild: message.guild.id }, async(err, data) => {
                  if(!data) return message.reply("Chatbot is allready off.")
                  if(data) data.delete();
                  message.channel.send(`Turned off chatbot.`);
                })
            } else return message.reply("Option is not correct!")

        } else if(query === "modlogs") {
            if(options === "set") {
                const channel = message.mentions.channels.last();
                if(!channel) return message.reply("Please mention a channel!");
                SchemaModLogs.findOne({ Guild: message.guild.id }, async(err, data) => {
                  if(data) data.delete();
                  new SchemaModLogs({
                    Guild: message.guild.id,
                    Channel: channel.id,
                  }).save();
                  message.channel.send(`${channel} has been saved as the modlogs channel!;`)
                })
            } else if(options === "remove") {
                SchemaModLogs.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(data) data.delete();
                    if(!data) return message.reply("This server has no modlogs channel!");
                    message.channel.send("Deleted modlogs channel!");
                  })
            } else return message.reply("Option is not correct!")

        } else if(query === "global") {
            if(options === "set") {
                const channel = message.mentions.channels.last();
                if(!channel) return message.reply("Please mention a channel!");
                SchemaGlobal.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(data) return message.channel.send("International chat channel is allready set!");
                    data = new SchemaGlobal({
                        Guild: message.guild.id,
                        Channel: channel.id,
                        Activated: true,
                    });
                    data.save();
                    message.channel.send(`${channel} has been added to the international chat!`)
                })
            } else if(options === "remove") {
                SchemaGlobal.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(data) {
                        data.delete();
                        return message.channel.send(`Removed international chat!`);
                    }
                    if(!data) return message.reply("Server does not have an international chat!")
                });
            } else return message.reply("Option is not correct!")

        } else if(query === "prefix") {
            if(option === "set") {
                const res = args[2]
                if(!res) return message.channel.send('Please specify a prefix to change to.')
                if (res.match(/^(?:<@!?)?(\d{16,22})>/gi) || res.match(/^(?:<#?)?(\d{16,22})>$/gi) || res.match(/^(?:<:(?![\n])[()#$@-\w]+:?)?(\d{16,22})>$/gi)) return message.reply({content: `if u break me i will kill you`});
                prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        await data.delete()
                        data = new prefixSchema({
                            Guild : message.guild.id,
                            Prefix : res
                        })
                        data.save()
                        message.guild.members.cache.get(client.user.id).setNickname(`[${res}] ${client.user.username}`);
                        message.channel.send(`Your prefix has been updated to **${res}**`)
                    } else {
                        data = new prefixSchema({
                            Guild : message.guild.id,
                            Prefix : res
                        })
                        data.save()
                        message.guild.members.cache.get(client.user.id).setNickname(`[${res}] ${client.user.username}`);
                        message.channel.send(`Custom prefix in this server is now set to **${res}**`)
                    }
                })
            } else if(options === "reset") {
              prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
                if(!data) return message.channel.send("You dont have a custom prefix!");
                data.delete()
                message.channel.send(`The prefix has been reset to ${prefix}`)
                message.guild.members.cache.get(client.user.id).setNickname(`${client.user.username}`);
              })
            } else return message.reply("Option is not correct!")

        } else if(query === "blacklist") {
            const guild = { Guild: message.guild.id }
            if(options === "add") {
                const word = args[2]?.toLowerCase();
                if(!word) return message.channel.send('Please specify a word!');
                SchemaBlacklist.findOne(guild, async(err, data) => {
                  if(data) {
                    if(data.Words.includes(word)) return message.reply('That word already exist in the database.');
                    data.Words.push(word);
                    data.save();
                    blacklistedwords.get(message.guild.id).push(word)
                  } else {
                    new SchemaBlacklist({
                      Guild: message.guild.id,
                      Words: word
                    }).save();
                    blacklistedwords.set(message.guild.id, [ word ])
                  }
                  message.reply(`${word} is now blacklisted!`)
                })
            } else if(options === "remove") {
              const word = args[2]?.toLowerCase();
              if(!word) return message.channel.send('Please specify a word!');
              SchemaBlacklist.findOne(guild, async(err, data) => {
                if(!data) return message.reply('This guild has no data in the database!');
                if(!data.Words.includes(word)) return message.channel.send('That word doesnt exist in the database!');
                const filtered = data.Words.filter((target) => target !== word);
                await SchemaBlacklist.findOneAndUpdate(guild, {
                  Guild: message.guild.id,
                  Words: filtered
                });
                blacklistedwords.set(message.guild.id, filtered)
              });
                message.reply("Word has been removed!");
            } else if(options === "display") {
                SchemaBlacklist.findOne(guild, async(err, data) => {
                  if(!data) return message.reply('There is no data.');
                  message.channel.send({ embeds: [
                    new MessageEmbed()
                      .setTitle('Blacklisted Words')
                      .setDescription(data.Words.join(', '))
                  ]})
                })
            } else return message.reply("Option is not correct!")

        } else if(query === "goodbye") {
            if(options === "set") {

                if(args[2].toLowerCase() === "subtitle") {
                  const goodbye_description = args.slice(3).join(' ');
                  if(!goodbye_description) return message.reply("Please type what you want the subtitle of the goodbye card to be.")
                  if(message.content.length > 220) return message.reply("Subtitle to **long**! (That's what she sayed.)")
                  await client.mongo_quick.set(`goodbye-text-${message.guild.id}`, goodbye_description)
                  message.channel.send(`Set **${goodbye_description}** to subtitle`)

                } else if(args[2].toLowerCase() === "title") {
                  const goodbye_title = args.slice(3).join(' ');
                  if(!goodbye_title) return message.reply("Please type what you want the subtitle of the goodbye card to be.")
                  if(message.content.length > 220) return message.reply("Title to **long**! (That's what she sayed.)")
                  await client.mongo_quick.set(`goodbye-title-${message.guild.id}`, goodbye_title)
                  message.channel.send(`Set **${goodbye_description}** to title`)

                } else {
                  if(!args[2]) return message.reply("Themes are `dark`, `sakura`, `blue`, `bamboo`, `desert`, `code`")

                  const channel = message.mentions.channels.last();
                  if(!channel) return message.reply("Please mention a channel!");

                  if(args[2].toLowerCase() === "dark") {
                    await client.mongo_quick.set(`goodbye-theme-${message.guild.id}`, "dark")
                    message.channel.send("Goodbye options set theme to `dark`")

                  } else if(args[2].toLowerCase() === "sakura") {
                    await client.mongo_quick.set(`goodbye-theme-${message.guild.id}`, "sakura")
                    message.channel.send("Goodbye options set theme to `sakura`")

                  } else if(args[2].toLowerCase() === "blue") {
                    await client.mongo_quick.set(`goodbye-theme-${message.guild.id}`, "blue")
                    message.channel.send("Goodbye options set theme to `blue`")

                  } else if(args[2].toLowerCase() === "bamboo") {
                    await client.mongo_quick.set(`goodbye-theme-${message.guild.id}`, "bamboo")
                    message.channel.send("Goodbye options set theme to `bamboo`")

                  } else if(args[2].toLowerCase() === "desert") {
                    await client.mongo_quick.set(`goodbye-theme-${message.guild.id}`, "desert")
                    message.channel.send("Goodbye options set theme to `desert`")

                  } else if(args[2].toLowerCase() === "code") {
                    await client.mongo_quick.set(`goodbye-theme-${message.guild.id}`, "code")
                    message.channel.send("Goodbye options set theme to `code`")

                  } else return message.reply("Theme is invalid!")

                  SchemaGoodbye.findOne({ Guild: message.guild.id }, async(err, data) => {
                      if(data) {
                          data.Channel = channel.id;
                          data.save();
                      } else {
                          new SchemaGoodbye({
                              Guild: message.guild.id,
                              Channel: channel.id,
                          }).save();
                      }
                      message.reply(`${channel} has been set as the goodbye channel.`)
                  })

                }

            } else if(options === "remove") {
                if(await client.mongo_quick.has(`goodbye-theme-${message.guild.id}`) === true) await client.mongo_quick.remove(`goodbye-theme-${message.guild.id}`)
                if(await client.mongo_quick.has(`goodbye-title-${message.guild.id}`) === true) await client.mongo_quick.remove(`goodbye-title-${message.guild.id}`)
                if(await client.mongo_quick.has(`goodbye-text-${member.guild.id}`) === true) await client.mongo_quick.remove(`goodbye-text-${member.guild.id}`)
                SchemaGoodbye.findOne({ Guild: message.guild.id }, async(err, data) => {
                  if(!data) return message.reply("Goodbye channel is not set.")
                  data.delete()
                  message.channel.send("The goodbye channel has been reset!")
                })

            } else if(options === "show") {
              let goodbye_subtitle;
              if(await client.mongo_quick.has(`goodbye-text-${message.guild.id}`) === true) {
                  goodbye_subtitle = `${await client.mongo_quick.get(`goodbye-text-${message.guild.id}`)}`
              } else {
                  goodbye_subtitle = " "
              }

              let goodbye_title;
              if(await client.mongo_quick.has(`goodbye-title-${message.guild.id}`) === true) {
                goodbye_title = `${await client.mongo_quick.get(`goodbye-title-${message.guild.id}`)}`
              } else {
                goodbye_title = "Goodbye,"
              }

              let goodbye_theme;
              if(await client.mongo_quick.has(`goodbye-theme-${message.guild.id}`) === true) {
                goodbye_theme = `${await client.mongo_quick.get(`goodbye-theme-${message.guild.id}`)}`
              } else {
                goodbye_theme = "dark"
              }

              const user = message.member.user;
              const image = await drawCard({
                blur: true,
                title: goodbye_title,
                theme: goodbye_theme,
                text: `${user.username}#${user.discriminator}!`,
                subtitle: goodbye_subtitle,
                rounded: true,
                border: true,
                avatar: user.displayAvatarURL({ format: 'png' })
              });

              const attachment = new MessageAttachment(image, 'bye.png');
              message.channel.send({ files: [attachment] });

            } else return message.reply("Option is not correct!")

        } else if(query === "welcome") {
            if(options === "set") {

              if(!args[2]) return message.channel.send("Please specify a welcome card type!")

              if(args[2].toLowerCase() === "simple") {
                const channel = message.mentions.channels.last();
                if(!channel) return message.reply("Please mention a channel!");

                await client.mongo_quick.set(`welcome-type-${message.guild.id}`, "simple")
                SchemaWelcome.findOne({ Guild: message.guild.id }, async(err, data) => {
                    if(data) {
                        data.Channel = channel.id;
                        data.save();
                    } else {
                        new SchemaWelcome({
                            Guild: message.guild.id,
                            Channel: channel.id,
                        }).save();
                    }
                    message.reply(`${channel} has been set as the welcome channel.`)
                })

              } else if(args[2].toLowerCase() === "custom") {
                if(!args[3]) return message.reply("Themes are `dark`, `sakura`, `blue`, `bamboo`, `desert`, `code`")

                const channel = message.mentions.channels.last();
                if(!channel) return message.reply("Please mention a channel!");

                if(args[3].toLowerCase() === "dark") {
                  await client.mongo_quick.set(`welcome-type-${message.guild.id}`, "custom")
                  await client.mongo_quick.set(`welcome-theme-${message.guild.id}`, "dark")
                  message.channel.send("Welcome options set to `custom` with theme `dark`")

                } else if(args[3].toLowerCase() === "sakura") {
                  await client.mongo_quick.set(`welcome-type-${message.guild.id}`, "custom")
                  await client.mongo_quick.set(`welcome-theme-${message.guild.id}`, "sakura")
                  message.channel.send("Welcome options set to `custom` with theme `sakura`")

                } else if(args[3].toLowerCase() === "blue") {
                  await client.mongo_quick.set(`welcome-type-${message.guild.id}`, "custom")
                  await client.mongo_quick.set(`welcome-theme-${message.guild.id}`, "blue")
                  message.channel.send("Welcome options set to `custom` with theme `blue`")

                } else if(args[3].toLowerCase() === "bamboo") {
                  await client.mongo_quick.set(`welcome-type-${message.guild.id}`, "custom")
                  await client.mongo_quick.set(`welcome-theme-${message.guild.id}`, "bamboo")
                  message.channel.send("Welcome options set to `custom` with theme `bamboo`")

                } else if(args[3].toLowerCase() === "desert") {
                  await client.mongo_quick.set(`welcome-type-${message.guild.id}`, "custom")
                  await client.mongo_quick.set(`welcome-theme-${message.guild.id}`, "desert")
                  message.channel.send("Welcome options set to `custom` with theme `desert`")

                } else if(args[3].toLowerCase() === "code") {
                  await client.mongo_quick.set(`welcome-type-${message.guild.id}`, "custom")
                  await client.mongo_quick.set(`welcome-theme-${message.guild.id}`, "code")
                  message.channel.send("Welcome options set to `custom` with theme `code`")

                } else return message.reply("Theme is invalid!")

                SchemaWelcome.findOne({ Guild: message.guild.id }, async(err, data) => {
                  if(data) {
                      data.Channel = channel.id;
                      data.save();
                  } else {
                      new SchemaWelcome({
                          Guild: message.guild.id,
                          Channel: channel.id,
                      }).save();
                  }
                  message.reply(`${channel} has been set as the welcome channel.`)
                })

              } else return message.channel.send("Welcome card type is invalid!")

            } else if(options === "remove") {
                if(await client.mongo_quick.has(`welcome-type-${message.guild.id}`) === true) await client.mongo_quick.remove(`welcome-type-${message.guild.id}`)

                if(await client.mongo_quick.has(`welcome-theme-${message.guild.id}`) === true) await client.mongo_quick.remove(`welcome-theme-${message.guild.id}`)

                SchemaWelcome.findOne({ Guild: message.guild.id }, async(err, data) => {
                  if(!data) return message.reply("Welcome channel is not set.")
                  data.delete()
                  message.channel.send("The welcome channel has been reset!")
                })

            } else return message.reply("Option is not correct!")

        } else if(query === "list") {

            let xp_command;
            if(await db.has(`xp-${message.guild.id}`) === true) {
              xp_command = false
            } else if(await db.has(`xp-${message.guild.id}`) === false) {
              xp_command = true
            }

            let xp_channel;
            if(await db.has(`xp-channel-${message.guild.id}`) === true) {
              xp_channel = `<#${db.get(`xp-channel-${message.guild.id}`)}>`
            } else if(await db.has(`xp-channel-${message.guild.id}`) === false) {
              xp_channel = "`no channel set`";
            }

            let nsfw_channel;
            if(await client.mongo_quick.has(`nsfw-ch-${message.guild.id}`) === false) {
              nsfw_channel = "`no channel set`";
            } else {
              nsfw_channel = `<#${await client.mongo_quick.get(`nsfw-ch-${message.guild.id}`)}>`
            }

            let autorole;
            if(await client.mongo_quick.has(`autorole-${message.guild.id}`) === true) {
              autorole = `<@&${await client.mongo_quick.get(`autorole-${message.guild.id}`)}>`
            } else {
              autorole = "`no role set`"
            }

            let invite;
            Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(data) invite = `<#${data.Channel}>`
              if(!data) invite = "`no channel set`"
              if(err) invite = "`error`"
            });

            let chatbot;
            SchemaChatBot.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(data) chatbot = `<#${data.Channel}>`
              if(!data) chatbot = "`no channel set`"
              if(err) invite = "`error`"
            });

            let modlogs;
            SchemaModLogs.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(data) modlogs = `<#${data.Channel}>`
              if(!data) modlogs = "`no channel set`"
              if(err) invite = "`error`"
            });

            let global;
            SchemaGlobal.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(data) global = `<#${data.Channel}>`
              if(!data) global = "`no channel set`"
              if(err) global = "`error`"
            });

            let goodbye;
            SchemaGoodbye.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(data) goodbye = `<#${data.Channel}>`
              if(!data) goodbye = "`no channel set`"
              if(err) goodbye = "`error`"
            });

            let welcome;
            SchemaWelcome.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(data) welcome = `<#${data.Channel}>`
              if(!data) welcome = "`no channel set`"
              if(err) welcome = "`error`"
            });

            let welcome_type;
            if(await client.mongo_quick.has(`welcome-type-${message.guild.id}`) === true) {
              welcome_type = await client.mongo_quick.get(`welcome-type-${message.guild.id}`)
            } else {
              welcome_type = "welcome type not set"
            }

            let welcome_theme;
            if(await client.mongo_quick.has(`welcome-theme-${message.guild.id}`) === true) {
              welcome_theme = await client.mongo_quick.get(`welcome-theme-${message.guild.id}`)
            } else {
              welcome_theme = "welcome theme not set"
            }

            let goodbye_subtitle;
            if(await client.mongo_quick.has(`goodbye-text-${message.guild.id}`) === true) {
                goodbye_subtitle = `${await client.mongo_quick.get(`goodbye-text-${message.guild.id}`)}`
            } else {
                goodbye_subtitle = " "
            }

            let goodbye_title;
            if(await client.mongo_quick.has(`goodbye-title-${message.guild.id}`) === true) {
              goodbye_title = `${await client.mongo_quick.get(`goodbye-title-${message.guild.id}`)}`
            } else {
              goodbye_title = "Goodbye,"
            }

            let goodbye_theme;
            if(await client.mongo_quick.has(`goodbye-theme-${message.guild.id}`) === true) {
              goodbye_theme = `${await client.mongo_quick.get(`goodbye-theme-${message.guild.id}`)}`
            } else {
              goodbye_theme = "dark"
            }

            const embed = new MessageEmbed()
              .setTitle("Options")
              .setDescription(`
                **Command Options:**
                **NSFW** - \`${await client.mongo_quick.has(`nsfw-${message.guild.id}`)}\`
                **NSFW Channel** - ${nsfw_channel}
                **XP** - \`${xp_command}\`
                **XP Channel** - ${xp_channel}
                **Autorole** - ${autorole}
                **Invite** - ${invite}
                **Captcha** - \`${await db.has(`captcha-${message.guild.id}`)}\`
                **Chatbot** - ${chatbot}
                **ModLogs** - ${modlogs}
                **Global** - ${global}
                **Prefix** - \`${await client.prefix(message)}\`
                **Goodbye** - ${goodbye}
                **Goodbye Theme** - \`${goodbye_theme}\`
                **Goodbye Main Text** - \`${goodbye_title}\`
                **Goodbye Sub Text** - \`${goodbye_subtitle}\`
                **Welcome** - ${welcome}
                **Welcome Type** - \`${welcome_type}\`
                **Welcome Theme** - \`${welcome_theme}\`
                `)
                .setColor("RANDOM")
              await message.channel.send({ embeds: [embed] })
        } else if(query === "cmd") {
            if(options === "enable") {
                const cmd = args[0];
                if (!cmd) return message.channel.send('Please specify a command')
                if (!!client.commands.get(cmd) === false) return message.channel.send('This command does not exist');
                SchemaCMD.findOne({
                  Guild: message.guild.id
                }, async (err, data) => {
                    if(!data) return message.reply("This server does not have any commands disabled.")
                  if (err) throw err;
                  if (data) {
                    if (data.Cmds.includes(cmd)) {
                      let commandNumber;

                      for (let i = 0; i < data.Cmds.length; i++) {
                        if (data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                      }

                      await data.save()
                      message.channel.send(`Enabled ${cmd}!`)
                    } else return message.channel.send('That command isnt turned off.')
                  }
                })
            } else if(options === "disable") {
                const cmd = args[0];
                if (!cmd) return message.channel.send('Please specify a command')
                if (!!client.commands.get(cmd) === false) return message.channel.send('This command does not exist');
                SchemaCMD.findOne({
                  Guild: message.guild.id
                }, async (err, data) => {
                  if (err) throw err;
                  if (data) {
                    if (data.Cmds.includes(cmd)) return message.channel.send('This command has already been disabled.');
                    data.Cmds.push(cmd)
                  } else {
                    data = new SchemaCMD({
                      Guild: message.guild.id,
                      Cmds: cmd
                    })
                  }
                  await data.save();
                  message.channel.send(`Command ${cmd} has been disabled`)
                })
            } else return message.reply("Option is not correct!")

        } else if(query === "autorole") {
          if(options === "on") {
            const role = message.mentions.roles.last()
            if(!role) return message.reply("Please mention a role.")
            client.modlogs({
              Member: message.author,
              Action: 'Autorole',
              Color: "#7c6bff",
              Reason: role.name
            }, message)
            await client.mongo_quick.set(`autorole-${message.guild.id}`, role.id)
            message.reply(`${role.name} is the autorole!`)
          } else if(options === "off") {
            if(await client.mongo_quick.has(`autorole-${message.guild.id}`) === false) return message.reply("Autorole is allready off!")
            await client.mongo_quick.remove(`autorole-${message.guild.id}`)
            message.reply("Removed autorole!")
          } else return message.reply("Option is not correct!")

        } else return message.reply("Query is not correct!")
    }
}
