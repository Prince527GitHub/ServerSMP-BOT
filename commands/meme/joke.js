const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const oneLinerJoke = require('one-liner-joke');

module.exports = {
    name: "joke",
    description : "Get's a random joke.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        var joke = oneLinerJoke.getRandomJoke();
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(joke.body)
        message.channel.send({ embeds: [embed] });
    },
};