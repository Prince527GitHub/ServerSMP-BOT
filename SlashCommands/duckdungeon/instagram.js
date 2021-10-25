const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const { instagramUser } = require("popcat-wrapper");

module.exports = {
    name: "dd-instagram",
    description: "returns duck dungeon's instagram",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = await instagramUser("duckdevs")

        const attachment = new MessageAttachment("./assets/image/reddit_icon.png", "reddit_icon.png")

        interaction.followUp({ embeds: [
            new MessageEmbed()
                .setColor("#90ee90")
                .setAuthor(`${user.full_name}`, "attachment://reddit_icon.png", "https://www.instagram.com/duckdevs/")
                .setDescription(`**Post:** \`${user.posts}\` **Reels:** \`${user.reels}\` **Followers:** \`${user.followers}\` **Following:** \`${user.following}\`\n*${user.biography}*`)
        ], files:[attachment]})
    },
};
