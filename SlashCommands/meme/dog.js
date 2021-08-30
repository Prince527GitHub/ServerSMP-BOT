const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const superAgent = require("superagent");

module.exports = {
    name: "dog",
    description: "A random image of a dog.",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
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
        interaction.followUp({ embeds: [embed] });
    },
};