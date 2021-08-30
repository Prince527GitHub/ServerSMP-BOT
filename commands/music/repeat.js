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
        if(!message.member.voice.channel) return message.channel.send({ embed: [
            new MessageEmbed()
                .setDescription("Sorry, but you need to be in a voice channel to do that")
                .setColor("YELLOW")
        ]});
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