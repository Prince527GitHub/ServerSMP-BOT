const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/goodbye');

module.exports = {
    name: 'check-goodbye',
    category : 'welcome/goodbye',
    usage: '',
    description : "Check what channel the goodbye card will be sent in.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply("This guild has no data stored");
            const channel = client.channels.cache.get(data.Channel);
            message.reply(`Goodbye channel => ${channel}`);
        })
    }
}
