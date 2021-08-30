const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'rickroll',
    description : "Plays a gif of never gonna give you up.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("Rickroll")
            .setColor("RANDOM")
            .setDescription("You just got ricked rolled.")
            .setImage("https://prince527.reeee.ee/572ER1awa.gif")
        message.channel.send({ embeds: [embed] })
    },
};