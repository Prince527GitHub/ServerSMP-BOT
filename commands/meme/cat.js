const { Message, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "cat",
    description: "A random image of a cat.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Cat")
            .setImage(String('https://cataas.com/cat?t=' + new Date().getTime().toString()))
        message.channel.send({ embeds: [embed] });
    },
};