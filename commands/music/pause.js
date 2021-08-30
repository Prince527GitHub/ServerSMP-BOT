const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'pause',
    description : "Pause the music in queue.",
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
                    .setDescription("The music player is already paused")
                    .setColor("RED")
            ]});
        }
        client.player.pause(message)
        message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("⏸ **|** The music player has been paused")
                .setColor("#5400FF")
        ]});
    },
};