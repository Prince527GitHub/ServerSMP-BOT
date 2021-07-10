const { MessageEmbed, Message, Client } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const { createAdvancedSlider } = require("discord-epagination");

module.exports = {
    name: 'credit',
    category : 'info',
    description : "Credit to the people that help this project.",
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const embed0 = new MessageEmbed()
        .setTitle("Credit - Prince527")
        .setColor("#ffff00")
        .addField("Prince527", "He started the project!")
        .setThumbnail("https://serversmp.netlify.app/assets/prince.gif")
      const embed1 = new MessageEmbed()
        .setTitle("Credit - Wam25")
        .setColor("#ffffff")
        .addField("Wam25", "The duck command would not be here if it was not for him!")
        .setThumbnail("https://cdn.discordapp.com/avatars/424269868209143808/c10089051d6dec0e47f58c67b75e5812.png?size=128")
      const embed2 = new MessageEmbed()
        .setTitle("Credit - arpi")
        .setColor("#E7C9C5")
        .addField("arpi", "He made the youtube channel that is in the status!")
        .setThumbnail("https://cdn.discordapp.com/avatars/418159397643091979/b47bae122e4a168840471c888fea3728.png?size=128")
      const embed3 = new MessageEmbed()
        .setTitle("Credit - txtur")
        .setColor("#AADFEB")
        .addField("txtur", "He did nothing for this bot, but he did make the logo for ServerSMP!")
        .setThumbnail("https://cdn.discordapp.com/avatars/488363709992009728/a_b90d1ba938b72230db0b67dbb2d4631d.png?size=128")
      const embed4 = new MessageEmbed()
        .setTitle("Credit - reconlx")
        .setColor("#0F2D53")
        .addField("reconlx", "He did some great youtube vids that help me (Prince527) start makeing the bot!")
        .setThumbnail("https://avatars.githubusercontent.com/u/66986299?v=4")
      const embed5 = new MessageEmbed()
        .setTitle("Credit - UltraX")
        .setColor("#FFFFFF")
        .addField("UltraX", "He did some great youtube vids that help me (Prince527) start makeing the bot!")
        .setThumbnail("https://avatars.githubusercontent.com/u/67840146?v=4")
      const embed6 = new MessageEmbed()
        .setTitle("Credit - DashCruft")
        .setColor("#90C9DC")
        .addField("DashCruft", "He did some great youtube vids that help me (Prince527) start makeing the bot!")
        .setThumbnail("https://avatars.githubusercontent.com/u/59381835?v=4")
      createAdvancedSlider(
        message,
        [embed0, embed1, embed2, embed3, embed4, embed5, embed6],
        true,
        true,
        ["◀️", "▶️", "❌", "↩"],
        30000
      );
    }
  }
