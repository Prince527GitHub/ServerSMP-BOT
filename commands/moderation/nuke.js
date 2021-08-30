const { MessageEmbed, Message, Client } = require('discord.js');
const { antijoin } = require('../../collection/index');

module.exports = {
    name: "nuke",
    aliases: ["nukechannel", "channelnuke", "channelclear", "clearchannel"],
    cooldown: 1000 * 120,
    description: "This command deletes all messages in the channel it was ran in.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        message.channel.delete()
        message.channel.clone()
    }
}
