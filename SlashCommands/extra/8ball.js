const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const _8ball = require("../../assets/js/8ball.js");

module.exports = {
    name: "8ball",
    description: "Yep just a 8ball command",
    options: [
        {
          name: "question",
          description: "Question to ask 8ball",
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
      const text = interaction.options.getString("question")
      if(!text) return interaction.followUp("You need a question.");
      if(text.length > 1000) return interaction.followUp("Question can't be more then 1000 length.")
      const randomNumber = Math.floor(Math.random() * _8ball.length);
      const responseText = _8ball[randomNumber];
      interaction.followUp({ embeds: [
        new MessageEmbed()
          .setDescription(`**Question:** *${text}*\n**Answer:** ${responseText.emoji} *${responseText.text}*`)
          .setColor(`${responseText.color}`)
      ]})
    },
};
