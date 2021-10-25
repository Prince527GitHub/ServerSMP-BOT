const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const { subreddit } = require("popcat-wrapper");

module.exports = {
    name: "dd-reddit",
    description: "returns duck dungeons subreddit",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const reddit = await subreddit("duckdungeon")

        const attachment = new MessageAttachment("./assets/image/reddit_icon.png", "reddit_icon.png")
        const attach = new MessageAttachment("./assets/image/reddit_banner.png", "reddit_banner.png")

        interaction.followUp({ embeds: [
            new MessageEmbed()
                .setAuthor(`${reddit.title}`, "attachment://reddit_icon.png", "https://www.reddit.com/r/duckdungeon/")
                .setDescription(`**Members:** \`${reddit.members}\` **Online:** \`${reddit.active_users}\`\n*${reddit.description}*`)
                .setImage("attachment://reddit_banner.png")
                .setColor("#90ee90")
        ], files: [attachment, attach]})
    },
};
