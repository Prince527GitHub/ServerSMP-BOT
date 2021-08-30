const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const { Snake } = require('discord-gamecord');

module.exports = {
    name: 'snake',
    aliases : ['snakegame'],
    description : "You can play snake on discord.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        new Snake({
            message: message,
            embed: {
              title: 'Snake Game',
              color: '#7289da',
              OverTitle: "Game Over",
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢' },
            emojis: {
              board: '⬛', 
              food: '🍎',
              up: '⬆️', 
              right: '➡️',
              down: '⬇️',
              left: '⬅️',
            },
        }).startGame()
    }
}