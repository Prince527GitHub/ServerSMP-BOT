const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
  name: 'poll4',
  category : 'extra',
  usage: '[#channel] [what is the poll]',
  description : "Admins can make polls with 4 options.",
  userPermission: ["MANAGE_MESSAGES"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      let pollChannel = message.mentions.channels.first();
      let pollDescription = args.slice(1).join(' ');

      let pollDescription1;
      let pollDescription2;
      let pollDescription3;
      let pollDescription4;

const filter = msg => msg.author.id == message.author.id;
let options = {
  max: 1
};

message.channel.send("Q 1/4:\n\nOption 1?")
let col = await message.channel.awaitMessages(filter, options)
if(col.first().content == 'cancel') return message.channel.send("Cancelled");
pollDescription1 = col.first().content

message.channel.send("Q 2/4:\n\nOption 2?")
let col2 = await message.channel.awaitMessages(filter, options)
if(col2.first().content == 'cancel') return message.channel.send("Cancelled");
pollDescription2 = col2.first().content

message.channel.send("Q 3/4:\n\nOption 3?")
let col3 = await message.channel.awaitMessages(filter, options)
if(col3.first().content == 'cancel') return message.channel.send("Cancelled");
pollDescription3 = col3.first().content

message.channel.send("Q 4/4:\n\nOption 4")
let col4 = await message.channel.awaitMessages(filter, options)
if(col4.first().content == 'cancel') return message.channel.send("Cancelled");
pollDescription4 = col4.first().content

      let embedPoll = new MessageEmbed()
      .setTitle(pollDescription)
      .setDescription(`:one: = ${pollDescription1}\n:two: = ${pollDescription2}\n:three: = ${pollDescription3}\n:four: = ${pollDescription4}`)
      .setColor('YELLOW')
      let msgEmbed = await pollChannel.send(embedPoll);
      await msgEmbed.react('1️⃣')
      await msgEmbed.react('2️⃣')
      await msgEmbed.react('3️⃣')
      await msgEmbed.react('4️⃣')
    }
  }
