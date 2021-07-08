const {
  MessageEmbed,
  Message,
  Client
} = require('discord.js');
const { Calculator } = require('weky');

module.exports = {
  name: 'calculator',
  category: 'extra',
  usage: '',
  aliases: ['cal'],
  description: "Use a calculator!",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    await Calculator({
      message: message,
      embed: {
        title: 'Calculator',
        color: '#5865F2',
        timestamp: true,
      },
      disabledQuery: 'Calculator is disabled!',
      invalidQuery: 'The provided equation is invalid!',
      othersMessage: 'Only <@{{author}}> can use the buttons!',
    });
  }
}
