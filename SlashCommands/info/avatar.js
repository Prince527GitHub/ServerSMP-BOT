const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "info",
    type: "USER",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = client.users.fetch(interaction.targetId);

        interaction.followUp({ embeds: [
            new MessageEmbed()
                .setAuthor(user.tag)
                .setColor("RANDOM")
                .setImage(user.displayAvatarURL({ dynamic: true }))
        ]});
    },
};
