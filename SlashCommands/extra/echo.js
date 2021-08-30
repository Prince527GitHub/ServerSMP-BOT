const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "echo",
    description: "Echos your text as an embed!",
    options: [
        {
          name: "content",
          description: "Content of the embed",
          type: "STRING",
          required: true,
        }
      ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const [ description ] = args;
        const embed = new MessageEmbed()
            .setTitle("Echo!")
            .setDescription(description)
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL())
            .setColor("RANDOM")
        interaction.followUp({ embeds: [embed] });
    },
};
