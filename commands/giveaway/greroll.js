const { MessageEmbed, Message, Client } = require('discord.js');
const Nuggies = require('nuggies');
const  { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'greroll',
    category : 'giveaway',
    usage: '<messageID>',
    description : "Reroll a giveaway",
    userPermission: ["MANAGE_GUILD"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if (!args[0]) return message.reply('Please provide a message ID to the giveaway!', { allowedMentions: { repliedUser: false } });
      let win;
      try {
          win = await Nuggies.giveaways.reroll(client, args[0]);
      }
      catch (err) {
          console.log(err);
          return message.channel.send('Unable to find the giveaway!');
      }
      if (!win[0]) return message.channel.send('There are not enough people in the giveaway!');
      message.channel.send(`Rerolled! <@${win}> is the new winner of the giveaway!`, { component: new MessageButton().setLabel('Giveaway').setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[0]}`).setStyle('url') });
    }
  }
