const { MessageEmbed, Message, Client } = require('discord.js');
const oneLinerJoke = require('one-liner-joke');

module.exports = {
    name: 'joke',
    category : 'meme',
    usage: '',
    description : "Get's a random joke.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        var joke = oneLinerJoke.getRandomJoke();
        message.channel.send({embed: {
        color: 9384170,
        description: joke.body
        }});
    }
}