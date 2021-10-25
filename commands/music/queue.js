const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'queue',
    aliases : ['q'],
    description : "Show the current queue.",
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
        let queue = client.player.getQueue(message);
        if (!queue) return message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("There is nothing playing")
                .setColor("YELLOW")
        ]})
        message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor("Music Queue", message.client.user.avatarURL())
                .setDescription(queue.songs.map((song, id) => `**${id + 1}.** **[${song.name}](${song.url})**`).slice(0, 10).join("\n"))
                .setColor("#5400FF")
        ]});
    },
};
