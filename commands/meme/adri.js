const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'adri',
    category : 'meme',
    description : "Show's you a image of adri.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let image = new MessageAttachment("https://serversmp.netlify.app/sus.png", "whyyoudownloadshitguy.png");
        message.channel.send(image);
    }
}