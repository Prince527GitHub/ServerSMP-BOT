const { MessageEmbed, Message, Client } = require('discord.js');
const GameCord = require('gamecord-fork').djs

module.exports = {
    name: 'snake',
    category : 'games',
    usage: '',
    aliases : ['snakegame'],
    description : "You can play snake on discord.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        //const djsGames = require('djs-games')
        //const SnakeGame = new djsGames.SnakeGame()
        //SnakeGame.startGame(message)
        new GameCord.SnakeGame(message)
        .setTitle('My snake')
        .setColor('#7298da')
        .setTime(60000) // Always better to set max time because the default one is just 5s
        .on('end', game => console.log(`${game.message.author.tag}'s snake game score was ${game.score}`)) // Start event also exists
        .run()        
    }
}