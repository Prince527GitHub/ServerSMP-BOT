const { MessageEmbed, Message, Client } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'djs',
    category : 'extra',
    usage: '[Search djs docs]',
    description : "Search the discord.js docs",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let [query, branch] = args;
        if (!query) return message.channel.send("Please include a search query!");
        if (!branch) branch = "master";
        fetch(`https://djsdocs.sorta.moe/v2/embed?src=${branch}&q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(json => {
        if (!json) return message.channel.send("Not found!");
            message.channel.send({ embed: json });
        })
        .catch(() => {
            message.channel.send("Couldn't fetch docs!");
        })
    }
}