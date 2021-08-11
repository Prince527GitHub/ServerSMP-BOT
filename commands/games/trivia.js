const { MessageEmbed, Message, Client } = require('discord.js');
const { Trivia } = require("weky");

module.exports = {
    name: 'trivia',
    category : 'games',
    usage: '',
    description : "Play a trivia game in discord.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      await Trivia({
      	message: message,
      	embed: { color: '#7289da', timestamp: true, title: 'Trivia' },
      	difficulty: 'hard',
      	thinkMessage: 'I am thinking',
      	winMessage:
      		'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
      	loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
      	emojis: {
      		one: '1️⃣',
      		two: '2️⃣',
      		three: '3️⃣',
      		four: '4️⃣',
      	},
      	othersMessage: 'Only <@{{author}}> can use the buttons!',
      	returnWinner: false,
      });
    }
}
