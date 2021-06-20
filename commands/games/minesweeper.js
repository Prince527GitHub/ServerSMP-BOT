const { MessageEmbed, Message, Client } = require('discord.js');
const mines = require('discord-minesweeper');

module.exports = {
    name: 'minesweeper',
    category : 'games',
    usage: '',
    description : "A very shit version of minesweeper (if click on box go boom unlucky).",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.author.send(mines(14, 14, 20, 'X', true));
    }
}