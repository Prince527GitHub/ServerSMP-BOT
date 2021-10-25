const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const jokes = require("../../assets/js/joke");

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
        const randomNumber = Math.floor(Math.random() * jokes.length);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(jokes[randomNumber])
        message.channel.send({ embeds: [embed] });
    },
};
