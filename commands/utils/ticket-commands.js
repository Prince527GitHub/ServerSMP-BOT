const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'ticket-commands',
    category : 'utils',
    usage: '[on/off]',
    aliases : ['ticket-c'],
    description : "Toggle on or off the ticket commands.",
    userPermission: ["ADMINISTRATOR"],
    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if(args[0] === 'on') {
          await db.set(`ticket-${message.guild.id}`, true);
          message.channel.send('Turned on ticket commands.');
      } else if(args[0] === 'off') {
          await db.delete(`ticket-${message.guild.id}`);
          message.channel.send('Turned off ticket commands.');
      }
    }
  }
