const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "avatar",
    type: "USER",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const guild = client.guilds.cache.get(interaction.guild.id)
        const user_find = guild.members.cache.get(interaction.targetId)

        interaction.followUp({ embeds: [
            new MessageEmbed()
                .setAuthor(`${user_find.user.tag}`)
                .setColor("RANDOM")
                .setImage(user_find.user.displayAvatarURL({ dynamic: true }))
        ]});
    },
};
