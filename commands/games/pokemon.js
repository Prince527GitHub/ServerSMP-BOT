const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const { GuessThePokemon } = require('discord-gamecord');

module.exports = {
    name: 'pokemon',
    description : "Show's a image of a pokemon and you guess what is it's name.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        new GuessThePokemon({
          message: message,
          embed: {
            title: 'Who\'s This Pokemon?',
            footer: 'You have only 1 chance',
            color: '#5865F2',
          },
          time: 60000,
          othersMessage: 'You are not allowed to use buttons for this message!',
          winMessage: 'Your guess was correct! The pokemon was **{pokemon}**',
          stopMessage: 'Better luck next time! It was a **{pokemon}**',
          incorrectMessage: 'Your guess was incorrect! The pokemon was **{pokemon}**',
        }).startGame();
        
    }
}