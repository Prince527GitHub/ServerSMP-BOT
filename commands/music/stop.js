const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
    name: 'stop',
    aliases : ['s'],
    description : "Stop the music player.",
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
        music.delete(message.guild.id);
        music.delete(`music-${message.guild.id}`);
        await client.player.stop(message);
        message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("⏹ **|** The music player has been stopped")
                .setColor("#5400FF")
        ]})
    },
};