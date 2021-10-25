const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");

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
        if(process.env.MUSIC === "false") return message.reply({ embeds: [
          new MessageEmbed()
            .setAuthor(`${client.user.username} will not be doing music anymore, please \`${client.prefix(message)}youtube\``)
            .setColor("BLUE")
        ]})
        if(!message.member.voice.channel) return message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("Sorry, but you need to be in a voice channel to do that")
                .setColor("YELLOW")
        ]})
        let voiceChannel = message.guild.me.voice.channel
        if(voiceChannel) {
          if(voiceChannel.id && message.member.voice.channel.id !== voiceChannel.id) return message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("You are not in my voice channel")
                .setColor("YELLOW")
          ]});
        }
        const queue = client.player.getQueue(message)
        if (!queue) return message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("There is nothing playing")
                .setColor("YELLOW")
        ]})
        await client.player.stop(message);
        message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("⏹ **|** The music player has been stopped")
                .setColor("#5400FF")
        ]})
    },
};
