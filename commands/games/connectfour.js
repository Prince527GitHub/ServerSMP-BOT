const { MessageEmbed, Message, Client } = require('discord.js');
const djsGames = require('djs-games')

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
        const ConnectFour = new djsGames.ConnectFour()
        ConnectFour.startGame(message)
    }
}
