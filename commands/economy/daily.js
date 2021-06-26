const { MessageEmbed, Message, Client, Collection } = require('discord.js');
const cooldown = new Collection();
const { convertMS } = require("discordutility");
const ms = require('ms');
let time = 86400000;

module.exports = {
    name: 'daily',
    category : 'economy',
    usage: '',
    description : "Daily money!",
    //cooldown: 1000 * 60 * 60 * 24,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      if (cooldown.has(message.author.id)) { // if user on cooldown

        const timeLeft = cooldown.get(message.author.id) - Date.now();
        const converted = convertMS(timeLeft); // Changes the ms to time
        message.channel.send(`You are on a ${ms(timeLeft)} cooldown!`);

      } else {
        const coins = Math.floor(Math.random() * 2000) + 1;
        message.channel.send(`You received **${coins}** coins today! Make sure to come and claim it again tommorow!`);
        client.add(message.author.id, coins);
      cooldown.set(message.author.id, Date.now() + time); // <- saves the time
      setTimeout(() => cooldown.delete(), time) // <- I don't remember what it does but it's needed
    }
    }
}
