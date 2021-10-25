const { Message, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
//const { DiscordBanners } = require('discord-banners');
const moment = require('moment');

module.exports = {
    name: "memberinfo",
    usage: '[@user (or not)]',
    description: "Show's info of you or mention user.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        //const discordBanners = new DiscordBanners(client);

        let userArray = message.content.split(" ");
        let userArgs = userArray.slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0]) || message.member;
        let x = Date.now() - member.createdAt;
        let y = Date.now() - message.guild.members.cache.get(member.id).joinedAt;
        const joined = Math.floor(y / 86400000);
        const joineddate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss");
        let nickname = member.nickname;
        if (nickname == null) {
          nickname = "No nickname set";
        }
        let banner;
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        if(message.mentions.members.first() || message.guild.members.cache.get(userArgs[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === userArgs.slice(0).join(" ") || x.user.username === userArgs[0])) {
                const embed = new MessageEmbed()
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setColor(roleColor)
                    .setTitle(`${member.user.tag}`)
                    .addFields(
                        {
                            name: "🧍 Username: ",
                            value: member.user.tag,
                            inline: false
                        },
                        {
                            name: "🧍 Nickname: ",
                            value: nickname,
                            inline: false
                        },
                        {
                            name: "🧍 Member ID: ",
                            value: member.id,
                            inline: false
                        },
                        {
                            name: "✨ Roles: ",
                            value: `<@&${member._roles.join('> <@&')}>`,
                            inline: false
                        },
                        {
                            name: "🎈 Creation Date: ",
                            value: ` ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`,
                            inline: false
                        },
                        {
                            name: "🎈 Joined the server At: ",
                            value: `${joineddate} \n> ${joined} day(S) Ago`,
                            inline: false,
                        }
                    )
                    await message.channel.send({ embeds: [embed] })
        } else {
            //banner = await discordBanners.getBanner(message.author.id, { size: 2048, format: "png", dynamic: true })
            // if (member.presence.status === 'dnd') member.presence.status = 'Do Not Disturb';
            // if (member.presence.status === 'online') member.presence.status = 'Online';
            // if (member.presence.status === 'idle') member.presence.status = 'Idle';
            // if (member.presence.status === 'offline') member.presence.status = 'offline';
            // let status = member.presence.status;
            // if(!banner) {
                const embed = new MessageEmbed()
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setColor(roleColor)
                    .setTitle(`${member.user.tag}`)
                    .addFields(
                        {
                            name: "🧍 Username: ",
                            value: member.user.tag,
                            inline: false
                        },
                        {
                            name: "🧍 Nickname: ",
                            value: nickname,
                            inline: false
                        },
                        {
                            name: "🧍 Member ID: ",
                            value: member.id,
                            inline: false
                        },
                        {
                            name: "✨ Roles: ",
                            value: `<@&${member._roles.join('> <@&')}>`,
                            inline: false
                        },
                        {
                            name: "🎈 Creation Date: ",
                            value: ` ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`,
                            inline: false
                        },
                        {
                            name: "🎈 Joined the server At: ",
                            value: `${joineddate} \n> ${joined} day(S) Ago`,
                            inline: false,
                        }
                    )
                    await message.channel.send({ embeds: [embed] })
              // } else {
              //   const embed = new MessageEmbed()
              //       .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
              //       .setColor(roleColor)
              //       .setTitle(`${member.user.tag}`)
              //       .addFields(
              //           {
              //               name: "🧍 Username: ",
              //               value: member.user.tag,
              //               inline: false
              //           },
              //           {
              //               name: "🧍 Nickname: ",
              //               value: nickname,
              //               inline: false
              //           },
              //           {
              //               name: "🧍 Member ID: ",
              //               value: member.id,
              //               inline: false
              //           },
              //           {
              //               name: "✨ Roles: ",
              //               value: `<@&${member._roles.join('> <@&')}>`,
              //               inline: false
              //           },
              //           {
              //               name: "🎈 Creation Date: ",
              //               value: ` ${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY")}`,
              //               inline: false
              //           },
              //           {
              //               name: "🎈 Joined the server At: ",
              //               value: `${joineddate} \n> ${joined} day(S) Ago`,
              //               inline: false,
              //           },
              //           {
              //               name: "💡 Status: ",
              //               value: status,
              //               inline: false
              //           }
              //       )
              //       .setImage(banner)
              //       await message.channel.send({ embeds: [embed] })
              // }
        }
    },
};
