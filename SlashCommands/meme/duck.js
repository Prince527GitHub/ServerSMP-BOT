const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "duck",
    description: "A random image of a duck.",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setTitle("Random duck")
            .setColor("RANDOM")
            .setDescription("A random duck from `https://random-d.uk/`.")
            .setImage(String('https://random-d.uk/api/v2/randomimg?t=' + new Date().getTime().toString()))
        interaction.followUp({ embeds: [embed] });
    },
};