const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/welcome');

module.exports = {
    name: 'welcome-reset',
    category : 'welcome/goodbye',
    usage: '',
    description : "Reset the welcome channel!",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
            Schema.findOneAndDelete({ Guild : message.guild.id }, async(err, doc) => {
                    message.channel.send("The welcome channel has been reset!")
                })
    }
}
