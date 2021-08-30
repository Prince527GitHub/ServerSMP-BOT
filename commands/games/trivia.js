const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const { Trivia } = require('discord-gamecord');

module.exports = {
    name: 'trivia',
    category : 'games',
    description : "Play a trivia game in discord.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        new Trivia({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
              title: 'Trivia',
              description: 'You have {time} seconds to respond!',
              color: '#5865F2',
            },
            time: 60000,
              difficulty: 'hard',
            buttons: {
              one: '1️⃣',
              two: '2️⃣',
              three: '3️⃣',
              four: '4️⃣',
            },
              winMessage: 'GG, Your answer was correct! It was **{answer}**',
            loseMessage: 'Your answer was Incorrect! The correct answer was **{answer}**',
            othersMessage: 'You are not allowed to use buttons for this message!'
          }).startGame();
    }
}