const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
const DisTube = require('distube');

module.exports = {
    name: 'play',
    aliases : ['p'],
    usage: '[youtube video or playlist link | youtube video name]',
    description : "Play some music.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(!message.member.voice.channel) return message.channel.send(
            new MessageEmbed()
                .setDescription("Sorry, but you need to be in a voice channel to do that")
                .setColor("YELLOW")
        );
        const text = args.join(" ");
        if(!text) return message.channel.send(
            new MessageEmbed()
                .setDescription(`Invalid usage, use **\`${await client.prefix(message)}help play\`** for more information`)
                .setColor("RED")
        )
        await client.player.play(message, text);
    },
};
