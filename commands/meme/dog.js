const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const superAgent = require("superagent");

module.exports = {
    name: "dog",
    description : "A random image of a dog.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        var dog;
        dog = await superAgent
            .get("https://random.dog/woof.json");
        while (dog.body.url.endsWith(".webm") || dog.body.url.endsWith(".mp4")) {
            dog = await superAgent
                .get("https://random.dog/woof.json");
        }
        var embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Dog :dog:")
            .setImage(dog.body.url);
        message.channel.send({ embeds: [embed] });
    },
};