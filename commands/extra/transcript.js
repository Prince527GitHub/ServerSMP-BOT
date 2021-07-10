const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const { fetchTranscript } = require("reconlx");

module.exports = {
    name: 'transcript',
    category : 'extra',
    usage: '',
    description : "Take 50 message and turn it in to a html.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        fetchTranscript(message, 50).then((data) => {
            const file = new MessageAttachment(data, "index.html");
            message.channel.send(file);
            });
    }
}
