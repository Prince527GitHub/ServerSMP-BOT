const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "cat",
    description: "A random image of a cat.",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Cat")
            .setImage(String('https://cataas.com/cat?t=' + new Date().getTime().toString()))
        interaction.followUp({ embeds: [embed] });
    },
};