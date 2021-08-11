const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'cat',
    category : 'meme',
    usage: '',
    description : "A random image of a cat.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Cat")
            .setImage(String('https://cataas.com/cat?t=' + new Date().getTime().toString()))
        message.channel.send(embed);
    }
}
