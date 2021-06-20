const { MessageEmbed, Message, Client } = require('discord.js');
const GameCord = require('gamecord-fork').djs

module.exports = {
    name: 'connectfour',
    category : 'games',
    usage: '[@user]',
    aliases : ['cf'],
    description : "Play connectfour in discord against another user.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        new GameCord.ConnectFour(message)
        .setTitle('Connect4')
        .setColor('#7298da')
        .run() // Keep all your settings above and run it after all of your configuration!
    }
}