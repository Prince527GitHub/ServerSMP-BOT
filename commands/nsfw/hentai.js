const { MessageEmbed, Message, Client } = require('discord.js');
const got = require('got');

module.exports = {
    name: 'hentai',
    aliases : ['h'],
    description : "Show's a random hentai from r/hentai.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(await client.mongo_quick.has(`nsfw-${message.guild.id}`)=== false) return message.reply("NSFW commands disabled on this guild.");
            if(await client.mongo_quick.has(`nsfw-ch-${message.guild.id}`) === true) {
                if (message.channel.id === await client.mongo_quick.get(`nsfw-ch-${message.guild.id}`)) {
                    const embed = new MessageEmbed()
                    got('https://www.reddit.com/r/hentai/random/.json').then(response => {
                        let content = JSON.parse(response.body);
                        let permalink = content[0].data.children[0].data.permalink;
                        let memeUrl = `https://reddit.com${permalink}`;
                        let memeImage = content[0].data.children[0].data.url;
                        let memeTitle = content[0].data.children[0].data.title;
                        let memeUpvotes = content[0].data.children[0].data.ups;
                        let memeDownvotes = content[0].data.children[0].data.downs;
                        let memeNumComments = content[0].data.children[0].data.num_comments;
                        embed.setTitle(`${memeTitle}`)
                        embed.setURL(`${memeUrl}`)
                        embed.setImage(memeImage)
                        embed.setColor('RANDOM')
                        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
                        message.channel.send({ embeds: [embed] });
                    });
                  } else return message.reply(`<#${await client.mongo_quick.get(`nsfw-ch-${message.guild.id}`)}> Is the NSFW channel!`);
            } else {
                const embed = new MessageEmbed()
                got('https://www.reddit.com/r/hentai/random/.json').then(response => {
                    let content = JSON.parse(response.body);
                    let permalink = content[0].data.children[0].data.permalink;
                    let memeUrl = `https://reddit.com${permalink}`;
                    let memeImage = content[0].data.children[0].data.url;
                    let memeTitle = content[0].data.children[0].data.title;
                    let memeUpvotes = content[0].data.children[0].data.ups;
                    let memeDownvotes = content[0].data.children[0].data.downs;
                    let memeNumComments = content[0].data.children[0].data.num_comments;
                    embed.setTitle(`${memeTitle}`)
                    embed.setURL(`${memeUrl}`)
                    embed.setImage(memeImage)
                    embed.setColor('RANDOM')
                    embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
                    message.channel.send({ embeds: [embed] });
                });
            }
    }
}
