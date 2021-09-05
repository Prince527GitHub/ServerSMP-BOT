const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "simple ping",
    description: "returns bots ping",
    type: "MESSAGE",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args, message) => {
        let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
        const pingEmbed = new MessageEmbed()
            .setColor("#5539cc")
            .addField("Bots Ping :",
                `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
            )
        interaction.followUp({ embeds: [pingEmbed] });
    },
};