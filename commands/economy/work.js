const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'work',
    category : 'economy',
    usage: '',
    description : "Work to get money!",
    cooldown: 1000 * 60 * 60 * 2,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const jobs = ['Programmer', 'Builder', 'Waiter', 'Bus Driver', 'Chef', 'Mechanic', 'Doctor'];
        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 200) + 1;
        message.channel.send(`You worked as **${jobs[jobIndex]}** and earned **${coins}** coins!`);
        client.add(message.author.id, coins);
    }
}