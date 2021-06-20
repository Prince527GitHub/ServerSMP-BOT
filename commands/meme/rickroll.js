const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'rickroll',
    category : 'meme',
    usage: '',
    description : "Plays a gif of never gonna give you up.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setTitle("Rickroll")
            .setColor("RANDOM")
            .setDescription("You just got ricked rolled.")
        message.channel.send(embed)
        message.channel.send("https://i.imgur.com/2bGrIIF")
    }
}