const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'repeat',
    aliases : ['r'],
    usage: '[ off | one | all ]',
    description : "Repeat current track or the queue.",
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
        if(!message.member.voice.channel) return message.channel.send({ embed: [
            new MessageEmbed()
                .setDescription("Sorry, but you need to be in a voice channel to do that")
                .setColor("YELLOW")
        ]});
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
        let repeatslect = args[0];
        if(args[0].toUpperCase() === "ONE") {
          repeatslect = 1;
        } else if(args[0].toUpperCase() === "OFF") {
          repeatslect = 0;
        } else if(args[0].toUpperCase() === "ALL") {
          repeatslect = 2;
        }
        let mode = client.player.setRepeatMode(message, repeatslect);
        mode = mode ? mode == 2 ? "ALL" : "ONE" : "OFF";
        if(mode === "ALL") {
            message.channel.send({ embeds: [
                new MessageEmbed()
                    .setDescription(`🔁 **|** The repeat mode has been set to **\`${mode}\`**`)
                    .setColor("#5400FF")
            ]});
        } else if(mode === "ONE") {
            message.channel.send({ embeds: [
                new MessageEmbed()
                    .setDescription(`🔂 **|** The repeat mode has been set to **\`${mode}\`**`)
                    .setColor("#5400FF")
            ]});
        } else if(mode === "OFF") {
            message.channel.send({ embeds: [
                new MessageEmbed()
                    .setDescription(`▶ **|** The repeat mode has been set to **\`${mode}\`**`)
                    .setColor("#5400FF")
            ]});
        }
    },
};
