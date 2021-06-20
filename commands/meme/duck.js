const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'duck',
    category : 'meme',
    usage: '',
    description : "A random image of a duck.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Random duck")
            .setDescription("A random duck from `https://random-d.uk/`.")
            .setImage(String('https://random-d.uk/api/v2/randomimg?t=' + new Date().getTime().toString()))
        message.channel.send(embed)
    }
}