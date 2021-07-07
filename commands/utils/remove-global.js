const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/global');

module.exports = {
    name: 'remove-global',
    category : 'utils',
    usage: '',
    description : "Remove the global channel.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const query = { Guild: message.guild.id, Channel: message.channel.id, Activated: true }
        Schema.findOne(query, async(err, data) => {
            if(data) {
                await Schema.findOneAndDelete(query);
                return message.channel.send(`${message.channel} has been removed from international chat!`);
            }
            message.channel.send(`${message.channel} is not listed as an international chat channel!`);
        });
    }
}
