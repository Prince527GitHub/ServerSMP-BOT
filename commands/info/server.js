const { Message, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "server",
    description: "Give's info on the server that you are on.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id) {
          return client.emojis.cache.get(id).toString();
        }
        message.guild.emojis.cache.forEach((emoji) => {
          OverallEmojis++;
          if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id);
          } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id);
          }
        });

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '💢',
            VERY_HIGH: '💥'
        };

        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const owner = await message.guild.fetchOwner();
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        let txt = '💬 '
        let ch = '🎤 '
        let mem = '👋 '
        let online = "🟢"
        let idle = "🟡"
        let dnd = "🔴"
        let offline = "⚫"
        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s stats`)
            .setColor(roleColor)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addFields(
                { 
                    name: 'Name: ', 
                    value: `${message.guild.name}`, 
                    inline: true 
                },
                { 
                    name: 'Owner: ', 
                    value: `${owner.user.tag}`,
                    inline: true
                },
                { 
                    name: `Boosts: `, 
                    value: `${message.guild.premiumTier ? `Tier : ${message.guild.premiumTier}` : 'None'}`, 
                    inline: true 
                },
                { 
                    name: 'Boost Count: ', 
                    value: `${message.guild.premiumSubscriptionCount || '0'}`, 
                    inline: true 
                },
                { 
                    name: `Verification Level: `, 
                    value: `__${verificationLevels[message.guild.verificationLevel]}__`, 
                    inline: true 
                },
                { 
                    name: 'Time Created: ', 
                    value: `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`, 
                    inline: false
                },
                //{ 
                //    name: `${mem} Member Status: `, 
                //    value: `${online}  ${members.filter(member => member.presence.status === 'online').size}  ${dnd}: ${members.filter(member => member.presence.status === 'dnd').size}  ${idle}: ${members.filter(member => member.presence.status === 'idle').size}   ${offline}: ${members.filter(member => member.presence.status === 'offline').size}`, 
                //    inline: false 
                //},
                { 
                    name: 'Bots: ', 
                    value: `${members.filter(member => member.user.bot).size}`, 
                    inline: true 
                },
                { 
                    name: 'Roles: ', 
                    value: `${roles.length}`, 
                    inline: true 
                },
                {
                    name: 'Emojis: ',
                    value: `**Animated [${Animated}]**:\n${EmojisAnimated}\n**Standard [${EmojiCount}]**:\n${Emojis}\n**Over all emojis [${OverallEmojis}]**`,
                    inline: false 
                },
                {
                    name: 'Channels: ',
                    value: `${txt} Channels : ${channels.filter(channel => channel.type === 'text').size} **|** ${ch} Channels : ${channels.filter(channel => channel.type === 'voice').size}`,
                    inline: true 
                },
            )
            .setTimestamp();
        message.channel.send({ embeds: [embed] });

    },
};