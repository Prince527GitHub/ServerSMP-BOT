const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "dd-info",
    description: "returns info on duck dungeon",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ embeds: [
            new MessageEmbed()
                .setColor("#90ee90")
                .setTitle("Duck Dungeon")
                .setDescription("Duck Dungeon is a game where you play as a duck. An evil goose has stolen your bread, and you must bring it back. You will face many obstacles in your quest to bring back the holy bread.")
                .addField(
                    "Download",
                    "You can download the laucher or the android version at [duckdevs.me](https://duckdevs.me/)."
                )
                .addField(
                    "Credits",
                    "**DiamondGolurk** `Programming` `Game Design`\n**txtur** `Textures` `Game Design`\n**tRoboticGamer** `Sound Design` `Tilemap`\n**Prince527** `Web Design` `Game Design`"
                )
                .addField(
                    "Social Media",
                    "[Link](https://discord.com/invite/95TANe26Km)"
                )
        ]})
    },
};
