const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "report",
    description: "Report a bug to the owner of the bot.",
    options: [
        {
          name: "bug",
          description: "The bug.",
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
        let sendstuff;
        
        if(process.env.REPORT.split(', ', 2).splice(0, 1).toString().toUpperCase() === "USER") {
            sendstuff = client.users.cache.get(process.env.REPORT.split(', ', 2).splice(1).toString());
        } else if(process.env.REPORT.split(', ', 2).splice(0, 1).toString().toUpperCase() === "SERVER") {
            sendstuff = client.channels.cache.get(process.env.REPORT.split(', ', 2).splice(1).toString());
        } else return interaction.followUp({ content: "Owner did not set options correct.", ephemeral: true });

        const [ bug ] = args;
        
        const reportEmbed = new MessageEmbed()
            .setTitle('New BUG!')
            .addField('Author', `<@${interaction.member.user.id}>`, true)
            .addField('Guild', interaction.guild.name, true)
            .addField('Report', bug)
            .setThumbnail(interaction.member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        sendstuff.send({ embeds: [reportEmbed] });
        
        interaction.followUp({ content: "Report has been sent!", ephemeral: true });
    },
};