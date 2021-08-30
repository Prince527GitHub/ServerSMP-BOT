const { Message, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "badapple",
    description: "Play's a gif of bad apple.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Badapple")
            .setDescription("Yes this is a command.")
            .setImage("https://prince527.reeee.ee/572yVt9US.gif")
        message.channel.send({ embeds: [embed] })
    },
};