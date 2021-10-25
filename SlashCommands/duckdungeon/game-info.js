const { Client, CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "dd-game-info",
    description: "returns game/launcher info for duck dungeon",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let DuckDungeon;
        await fetch ('https://duckdevs.me/assets/duckdungeon.json')
        .then (res => res.text())
        .then (body => DuckDungeon = JSON.parse(body))

        interaction.followUp({ embeds: [
            new MessageEmbed()
                .setTitle(`${DuckDungeon.name}`)
                .addField(
                    "Launcher",
                    `**Version:** \`${DuckDungeon.launcher.version}\`\n**Link:** ${DuckDungeon.launcher.link}`
                )
                .addField(
                    "Game",
                    `**Version:** \`${DuckDungeon.game.version}\`\n**Patch Notes:** *${DuckDungeon.game.patch_notes}*\n**Dscription:** *${DuckDungeon.game.description}*`
                )
                .setColor("#90ee90")
        ]})
    },
};
