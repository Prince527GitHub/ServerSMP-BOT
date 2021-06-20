const { MessageEmbed, Message, Client } = require('discord.js');
const fetch = require("node-fetch");

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
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Cat")
            .setImage(file)
        message.channel.send(embed);
    }
}