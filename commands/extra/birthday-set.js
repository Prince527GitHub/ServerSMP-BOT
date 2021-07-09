const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/birthday');

module.exports = {
    name: 'birthday-set',
    category : 'extra',
    usage: '[day/month]',
    aliases : ['b-set'],
    description : "Set birthday!",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
      };
      const joined = args.join(" ");
      const split = joined.trim().split("/");
      let [ day, month ] = split;
      if(!day) return message.reply("Please give a day!");
      if(!month) return message.reply("Please give a month!");
      if(isNaN(day) || isNaN(month)) return message.reply("The date you gave isnt a number!");
      day = parseInt(day);
      month = parseInt(month);
      if(!day || day > 31) return message.reply("Wrong day format!");
      if(!month || month > 12) return message.reply("Wrong month format!");
      const convertedDay = suffixes(day);
      const convertedMonth = months[month]
      const birthdayString = `${convertedDay} of ${convertedMonth}`
      Schema.findOne({ User: message.author.id }, async(err, data) => {
        if(data) {
          data.Birthday = birthdayString;
          data.save();
        } else {
          new Schema({
            User: message.author.id,
            Birthday: birthdayString
          }).save();
        }
      })
      message.channel.send(`Saved ${birthdayString}`)
    }
  }
/**
* @param {Number} number
*/

  function suffixes(number) {
    const converted = number.toString();
    const lastChar = converted.charAt(converted.length - 1);
    return lastChar == "1"
     ? `${convertedst}`
     : lastChar == "2"
     ? `${converted}nd`
     : lastChar == "3"
     ? `${converted}rd`
     : `${converted}th`;
  }
