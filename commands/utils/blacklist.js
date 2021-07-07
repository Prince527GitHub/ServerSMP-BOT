const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/blackwords');
const { blacklistedwords } = require('../../collection/index');

module.exports = {
    name: 'blacklist',
    category : 'utils',
    usage: '[add/remove/display]',
    aliases : ['bl'],
    description : "Add/remove/list the blacklisted words on this server.",
    userPermission: ["ADMINISTRATOR"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const query = args[0]?.toLowerCase();
      const guild = { Guild: message.guild.id }
      if(query === 'add') {
        const word = args[1]?.toLowerCase();
        if(!word) return message.channel.send('Please specify a word!');
        Schema.findOne(guild, async(err, data) => {
          if(data) {
            if(data.Words.includes(word)) return message.reply('That word already exist in the database.');
            data.Words.push(word);
            data.save();
            blacklistedwords.get(message.guild.id).push(word)
          } else {
            new Schema({
              Guild: message.guild.id,
              Words: word
            }).save();
            blacklistedwords.set(message.guild.id, [ word ])
          }
          message.reply(`${word} is now blacklisted!`)
        })
      } else if(query === 'remove') {
      const word = args[1]?.toLowerCase();
      if(!word) return message.channel.send('Please specify a word!');
      Schema.findOne(guild, async(err, data) => {
        if(!data) return message.reply('This guild has no data in the database!');
        if(!data.Words.includes(word)) return message.channel.send('That word doesnt exist in the database!');
        const filtered = data.Words.filter((target) => target !== word);
        await Schema.findOneAndUpdate(guild, {
          Guild: message.guild.id,
          Words: filtered
        });
        blacklistedwords.set(message.guild.id, filtered)
      });
        message.reply("Word has been removed!");
      } else if(query === 'display') {
        Schema.findOne(guild, async(err, data) => {
          if(!data) return message.reply('There is no data.');
          message.channel.send(
            new MessageEmbed()
              .setTitle('Blacklisted Words')
              .setDescription(data.Words.join(', '))
          )
        })
      } else return message.channel.send("That query doesnt exist!");
    }
  }
