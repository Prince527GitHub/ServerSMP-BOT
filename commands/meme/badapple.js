const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'badapple',
    category : 'meme',
    usage: '',
    description : "Play's a gif of bad apple.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Badapple")
            .setDescription("Yes this is a command.")
        message.channel.send(embed)
        message.channel.send("https://imgur.com/a/29ND22e")
    }
}