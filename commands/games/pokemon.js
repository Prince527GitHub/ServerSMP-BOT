const { MessageEmbed, Message, Client } = require('discord.js');
const { GuessThePokemon } = require("weky");

module.exports = {
    name: 'pokemon',
    category : 'games',
    usage: '',
    description : "Show's a image of a pokemon and you guess what is it's name.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      await GuessThePokemon({
      	message: message,
      	embed: {
      		title: 'Guess The Pokémon',
      		description:
      			'**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.',
      		color: '#7289da',
      		timestamp: true,
      	},
      	thinkMessage: 'I am thinking',
      	othersMessage: 'Only <@{{author}}> can use the buttons!',
      	winMessage:
      		'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
      	loseMessage: 'Better luck next time! It was a **{{answer}}**.',
      	time: 60000,
      	incorrectMessage: "No {{author}}! The pokémon isn't `{{answer}}`",
      	buttonText: 'Cancel',
      });
    }
}
