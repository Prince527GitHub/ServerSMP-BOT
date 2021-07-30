const { MessageEmbed, Message, Client } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    category : 'owner',
    usage: '[stuff]',
    description : "Ya do stuff.",
    owner: true,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const code = args.join(" ");
      if(!code) return message.reply('Please provide some code to evaluate!');

      try {
        const result = await eval(code)
        let output = result;
        if(typeof result !== 'string') {
          output = inspect(result)
        }
        message.channel.send(output, { code: 'js' })
      } catch (error) {
        message.channel.send('Evaluated content is too long to display.');
      }
    }
  }
