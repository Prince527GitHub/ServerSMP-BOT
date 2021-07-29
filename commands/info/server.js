const {
  MessageEmbed,
  Message,
  Client
} = require('discord.js');

module.exports = {
  name: 'server',
  category: 'info',
  usage: '',
  description: "Give's info on the server that you are on.",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

let region = {
    "brazil": ":flag_br: Brazil",
    "eu-central": ":flag_eu: Central Europe",
    "singapore": ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    "sydney": ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    "london": ":flag_gb: London",
    "amsterdam": ":flag_nl: Amsterdam",
    "hongkong": ":flag_hk: Hong Kong",
    "russia": ":flag_ru: Russia",
    "southafrica": ":flag_za:  South Africa"
};

      const embed = new MessageEmbed()
          .setThumbnail(message.guild.iconURL({dynamic: true}))
          .setColor(roleColor)
          .setTitle(`${message.guild.name} Server stats`)
          .addFields(
              {
                  name: "🔰 Owner: ",
                  value: message.guild.owner.user.tag,
                  inline: true
              },
              {
                  name: "👥 Members: ",
                  value: `There are ${message.guild.memberCount} users!`,
                  inline: true
              },
              {
                  name: "👥 Members Online: ",
                  value: `There are ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} users online!`,
                  inline: true
              },
              {
                  name: "💻 Total Bots: ",
                  value: `There are ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                  inline: true
              },
              {
                  name: "🎈 Creation Date: ",
                  value: message.guild.createdAt.toLocaleDateString("en-us"),
                  inline: true
              },
              {
                  name: "✨ Roles Count: ",
                  value: `There are ${message.guild.roles.cache.size} roles in this server.`,
                  inline: true,
              },
              {
                  name: "✅ Verified: ",
                  value: message.guild.verified ? 'Server is verified' : `Server isn't verified`,
                  inline: true
              },
              {
                  name: "🗺 Region of server: ",
                  value: region[message.guild.region],
                  inline: true
              },
              {
                  name: "✈ Boosters: ",
                  value: message.guild.premiumSubscriptionCount >= 1 ? `There are ${message.guild.premiumSubscriptionCount} Boosters` : `There are no boosters`,
                  inline: true
              },
              {
                  name: "😀 Emojis: ",
                  value: message.guild.emojis.cache.size,
                  inline: true
              },
              {
                  name: "🎇 Animated Emoji: ",
                  value: message.guild.emojis.cache.filter(emoji => emoji.animated).size,
                  inline: true
              },
              {
                  name: "👨‍💼 Total Amount of Roles: ",
                  value: message.guild.roles.cache.size,
                  inline: true
              },
              {
                  name: "💬 Total Text Channels: ",
                  value: message.guild.channels.cache.filter(channel => channel.type === 'text').size,
                  inline: true
              },
              {
                  name: "🎤 Total Voice Channels: ",
                  value: message.guild.channels.cache.filter(channel => channel.type === 'voice').size,
                  inline: true
              }
          )
          await message.channel.send(embed)

  }
}
