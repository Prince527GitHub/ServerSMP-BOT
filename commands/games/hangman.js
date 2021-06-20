const { MessageEmbed, Message, Client } = require('discord.js');
const hangman = require('discord-hangman');

module.exports = {
    name: 'hangman',
    category : 'games',
    usage: '',
    description : "The classic hangman game in discord.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await hangman.create(message.channel, 'random')
    }
}