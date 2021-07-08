const { MessageEmbed, Message, Client } = require('discord.js');
const { Snake } = require("weky");

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
      await Snake({
      	message: message,
      	embed: {
      		title: 'Snake',
      		description: 'GG, you scored **{{score}}** points!',
      		color: '#7289da',
      		timestamp: true,
      	},
      	emojis: {
      		empty: '⬛',
      		snakeBody: '🟩',
      		food: '🍎',
      		up: '⬆️',
      		right: '⬅️',
      		down: '⬇️',
      		left: '➡️',
      	},
      	othersMessage: 'Only <@{{author}}> can use the buttons!',
      	buttonText: 'Cancel',
      });
    }
}
