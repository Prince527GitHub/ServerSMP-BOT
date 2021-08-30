const { Message, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { pagination } = require('reconlx')

module.exports = {
    name: "credit",
    description: "Credit to the people that help this project.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed0 = new MessageEmbed()
            .setTitle("Credit - Prince527")
            .setColor("#ffff00")
            .addField("Prince527", "He started the project!")
            .setThumbnail("https://cdn.discordapp.com/attachments/814684250862649344/869683851679645726/Prince527.gif")
        const embed1 = new MessageEmbed()
            .setTitle("Credit - Wam25")
            .setColor("#ffffff")
            .addField("Wam25", "The duck command would not be here if it was not for him!")
            .setThumbnail("https://on-the-go.nothing-to-see-he.re/572mZz4Ew.png")
        const embed2 = new MessageEmbed()
            .setTitle("Credit - arpi")
            .setColor("#E7C9C5")
            .addField("arpi", "He made the youtube channel that is in the status!")
            .setThumbnail("https://on-the-go.nothing-to-see-he.re/572mZz4Ex.png")
        const embed3 = new MessageEmbed()
            .setTitle("Credit - txtur")
            .setColor("#AADFEB")
            .addField("txtur", "He did nothing for this bot, but he did make the logo for ServerSMP!")
            .setThumbnail("https://on-the-go.nothing-to-see-he.re/572mZzcUG.gif")
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

        const embeds = [embed0, embed1, embed2, embed3, embed4, embed5, embed6]
        
        pagination({
            embeds: embeds,
            message: message,
            channel: message.channel,
            author: message.author,
            time: 50000,
        })
    },
};