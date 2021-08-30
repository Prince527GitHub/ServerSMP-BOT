const { MessageEmbed, Message, Client } = require('discord.js');
const img = require('images-scraper');
const google = new img({
    puppeteer : {
        headless : true,
}});

module.exports = {
    name: 'image',
    usage: '[search]',
    description : "Search google images on discord.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      if(await client.mongo_quick.has(`nsfw-${message.guild.id}`)=== false) return message.reply("NSFW commands disabled on this guild.");
        if(await client.mongo_quick.has(`nsfw-ch-${message.guild.id}`) === true) {
          if(message.channel.id === await client.mongo_quick.get(`nsfw-ch-${message.guild.id}`)) {
            const query = args.join(" ")
            if(!query) return message.channel.send('Please enter a search query')
            const results = await google.scrape(query, 1)
            message.channel.send(results[0].url);
    } else return message.reply(`<#${await client.db_mongo.get(`nsfw-ch-${message.guild.id}`)}> Is the NSFW channel!`);
        } else {
          const query = args.join(" ")
          if(!query) return message.channel.send('Please enter a search query')
          const results = await google.scrape(query, 1)
          message.channel.send(results[0].url);
        }
    }
}
