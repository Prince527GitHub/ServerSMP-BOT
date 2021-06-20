const { MessageEmbed, Message, Client } = require('discord.js');
const prefixSchema = require('../../models/prefix');
const config = require('../../config.json')
const prefix = config.prefix

module.exports = {
    name: 'prefix-reset',
    category : 'prefix',
    usage: '',
    description : "Reset the prefix!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need permissions!");
                prefixSchema.findOneAndDelete({ Guild : message.guild.id }, async(err, doc) => {
                    message.channel.send(`The prefix has been reset to ${prefix}`)
                })
    }
}