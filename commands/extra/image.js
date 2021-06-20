const { MessageEmbed, Message, Client } = require('discord.js');
const img = require('images-scraper');
const google = new img({
    puppeteer : {
        headless : true,
}});

module.exports = {
    name: 'image',
    category : 'extra',
    usage: '[search]',
    description : "Search google images on discord.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args.join(" ")
        if(!query) return message.channel.send('Please enter a search query')
        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}