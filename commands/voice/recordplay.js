const { MessageEmbed, Message, Client } = require('discord.js');
const fs = require("fs");

module.exports = {
    name: 'recordplay',
    category : 'voice',
    usage: '',
    aliases : ['rp'],
    description : "Play the clip of you talking in vc.",
    userPremium: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const voicechannel = message.member.voice.channel;
        if (!voicechannel) return message.channel.send("Please join a voice channel!");
        if (!fs.existsSync(`./recorded-${message.author.id}.pcm`)) return message.channel.send("Your audio is not recorded!");
        const connection = await message.member.voice.channel.join();
        const stream = fs.createReadStream(`./recorded-${message.author.id}.pcm`);
        const dispatcher = connection.play(stream, {
            type: "converted"
        });
        dispatcher.on("finish", () => {
            message.member.voice.channel.leave();
            return message.channel.send("finished playing audio");
        })
    }
}
