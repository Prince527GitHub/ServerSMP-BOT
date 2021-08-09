const { MessageEmbed, Message, Client } = require('discord.js');
const img = require('images-scraper');
const db = require('quick.db');
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
      if(db.has(`nsfw-${message.guild.id}`)=== false) return message.reply("NSFW commands disabled on this guild.");
          if(await client.db_mongo.get(`nsfw-ch-${message.guild.id}`) !== "xxxxxxxxxxxxxxxxxxxx") {
              if (message.channel.id === await client.db_mongo.get(`nsfw-ch-${message.guild.id}`)) {
            const query = args.join(" ")
            if(!query) return message.channel.send('Please enter a search query')
            const results = await google.scrape(query, 1)
            message.channel.send(results[0].url);
    } else {
      return message.reply(`<#${await client.db_mongo.get(`nsfw-ch-${message.guild.id}`)}> Is the NSFW channel!`);
    }
        } else {
          const query = args.join(" ")
          if(!query) return message.channel.send('Please enter a search query')
          const results = await google.scrape(query, 1)
          message.channel.send(results[0].url);
        }
    }
}
