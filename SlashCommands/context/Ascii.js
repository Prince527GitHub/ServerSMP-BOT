const { Client, ContextMenuInteraction } = require("discord.js");
const figlet = require("figlet");

module.exports = {
  name: "Ascii",
  type: 'MESSAGE',
  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const msg = await interaction.channel.messages.fetch(
      interaction.targetId
    );

    figlet.text(
      `${msg.content}`,
      {
        font: "Standard"
      },
      async (err, data) => {
        interaction.followUp({ content: `\`\`\`${data}\`\`\`` });
      }
    );
  },
};