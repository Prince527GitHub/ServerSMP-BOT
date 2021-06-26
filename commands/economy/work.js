const { MessageEmbed, Message, Client, Collection } = require('discord.js');
const cooldown = new Collection();
const { convertMS } = require("discordutility");
const ms = require('ms');
let time = 7200000;

module.exports = {
    name: 'work',
    category : 'economy',
    usage: '',
    description : "Work to get money!",
    //cooldown: 1000 * 60 * 60 * 2,
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
        const jobs = ['Programmer', 'Builder', 'Waiter', 'Bus Driver', 'Chef', 'Mechanic', 'Doctor'];
        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 200) + 1;
        message.channel.send(`You worked as **${jobs[jobIndex]}** and earned **${coins}** coins!`);
        client.add(message.author.id, coins);
      cooldown.set(message.author.id, Date.now() + time); // <- saves the time
      setTimeout(() => cooldown.delete(), time) // <- I don't remember what it does but it's needed
    }
    }
}
