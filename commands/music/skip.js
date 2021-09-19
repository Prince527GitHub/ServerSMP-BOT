const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'skip',
    aliases : ['sk'],
    description : "Skip the current music.",
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
        let queue = client.player.getQueue(message);
        if (!queue) return message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription("There is nothing playing")
                .setColor("YELLOW")
        ]})
        await client.player.skip(message);
        message.channel.send({ embeds: [
            new MessageEmbed()
                .setDescription(queue.songs.map((song, id) => `⏭ **|** Skipped **[${song.name}](${song.url}})**`).slice(0, 1))
                .setColor("#5400FF")
        ]})
    },
};
