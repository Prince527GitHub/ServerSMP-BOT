const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'resume',
    description : "Resume the paused music.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("Sorry, but you need to be in a voice channel to do that")
                .setColor("YELLOW")
        ]})
        const queue = client.player.getQueue(message)
        if (!queue) return message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("There is nothing playing")
                .setColor("YELLOW")
        ]})
        if (queue.pause) {
            client.player.resume(message)
            return message.channel.send({ embeds: [
                new MessageEmbed()
                    .setDescription("▶ **|** The music player has been resumed")
                    .setColor("#5400FF")
            ]})
        }
        message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("The music player is not paused")
                .setColor("RED")
        ]})
    },
};