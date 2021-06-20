const { MessageEmbed, Message, Client } = require('discord.js');
const { tictactoe } = require('reconlx');
//const djsGames = require('djs-games');

module.exports = {
    name: 'tictactoe',
    category : 'games',
    usage: '[@user]',
    description : "Play tictactoe against another user.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        //const TicTacToe = new djsGames.TicTacToe()
        //TicTacToe.startGame(message)
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}