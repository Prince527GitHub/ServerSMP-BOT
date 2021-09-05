const { Client, CommandInteraction, MessageEmbed, ContextMenuInteraction } = require("discord.js");
const translate = require("@iamtraction/google-translate")

module.exports = {
    name: "Translate",
    type: "MESSAGE",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const msg = await interaction.channel.messages.fetch(
            interaction.targetId
          );
    
          const translated = await translate(msg.content, { to: 'en' });
          const embed = new MessageEmbed()
          .setFooter(`${interaction.user.tag}`)
          .setTimestamp()
          .addField("Text To Translate:", `\`\`\`${msg.content}\`\`\``)
          .addField("Translateted Text:", `\`\`\`${translated.text}\`\`\``)
          .setColor('BLUE')
    
          interaction.followUp({ embeds: [embed] })
     
    },
};
