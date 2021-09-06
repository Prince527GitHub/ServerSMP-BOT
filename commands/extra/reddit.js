const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'reddit',
    usage: '[ subreddit name ]',
    description : "Get info on a subreddit!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const input = args.join(" ");
        if(!input) return message.channel.send("Please provide a subreddit name!")
        const response = await fetch(`https://api.popcat.xyz/subreddit/${encodeURIComponent(input)}`)
        const rsp = await response.json()
        if(rsp.error) return message.channel.send("Subreddit Not Found!")
        const yesno = {
            true: "Yes",
            false: "No"
        }
        const embed = new MessageEmbed()
        .setTitle("Subreddit Info")
        .setThumbnail(rsp.icon.split("?")[0])//to avoid discord not showing img as it has to end with .png or .extension
        .setColor("FF5700")
        .addField("Name", rsp.name, true)
        .addField("Title", rsp.title, true)
        .addField("URL", `[URL](${rsp.url})`, true)
        .addField("Active Users", rsp.active_users, true)
        .addField("Total Users", rsp.members, true)
        .addField("Images Allowed", yesno[rsp.allow_images], true)
        .addField("Videos Allowed", yesno[rsp.allow_videos], true)
        .addField("Over 18", yesno[rsp.over_18], true)
        .addField("Description", rsp.description ? rsp.description : "None");
        message.channel.send({ embeds: [embed] })
    }
}