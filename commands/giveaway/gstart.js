const { MessageEmbed, Message, Client } = require('discord.js');
const ms = require('ms');
const giveawayClient = require('../../client/index')

module.exports = {
    name: 'gstart',
    category : 'giveaway',
    usage: '[#channel] [time] [number of winners] [prize]',
    description : "Create a giveaway",
    userPermission: ["MANAGE_MESSAGES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const channel = message.mentions.channels.first();
        if(!channel) return messages.reply('Please specify a channel!');
        let time = args[1]; if(!time) return messages.reply('Please specify a time!');
        time = ms(time);
        giveawayClient.Start({
            channel,
            time,
            hostedBy: message.author,
            description: 'A random giveaway!',
            winners: parseInt(args[2]),
            prize: args.slice(3).join(" ")
        })
    }
}
