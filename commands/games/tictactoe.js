const { MessageEmbed, Message, Client } = require('discord.js');
const djsGames = require('djs-games')

module.exports = {
    name: 'tictactoe',
    category : 'games',
    usage: '[@user]',
    aliases: ['ttt'],
    description : "Play tictactoe against another user.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const TicTacToe = new djsGames.TicTacToe()
         TicTacToe.startGame(message)
    }
}
