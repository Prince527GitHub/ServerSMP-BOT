const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/welcome');

module.exports = {
    name: 'welcome-reset',
    category : 'welcome/goodbye',
    usage: '',
    description : "Reset the welcome channel!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You need permissions!");
            Schema.findOneAndDelete({ Guild : message.guild.id }, async(err, doc) => {
                    message.channel.send("The welcome channel has been reset!")
                })
    }
}