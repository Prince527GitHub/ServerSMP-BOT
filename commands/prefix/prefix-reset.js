const { MessageEmbed, Message, Client } = require('discord.js');
const prefixSchema = require('../../models/prefix');
const prefix = process.env.PREFIX;

module.exports = {
    name: 'prefix-reset',
    category : 'prefix',
    usage: '',
    description : "Reset the prefix!",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id }, async(err, doc) => {
                    message.channel.send(`The prefix has been reset to ${prefix}`)
                })
    }
}
