const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'fortnite-stats',
    usage: '[username]',
    aliases : ['fr-stats'],
    description : "Fortnite user stats.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(process.env.FORTNITE_TRACKER === "false") return message.reply("This command is disabled");
        const canvas = require("discord-canvas"),
        stats = new canvas.FortniteStats();
        
      const user = args.slice(0).join(' '),
        platform = "pc";
        
      let image = await stats
        .setToken(process.env.FORTNITE_TRACKER)
        .setUser(user)
        .setPlatform(platform)
        .toAttachment();
       
      if (platform !== "pc" && platform !== "xbl" && platform !== "psn") return message.channel.send("Please enter a valid platform")
      if (!image) return message.channel.send("User not found")
       
      let attachment = new MessageAttachment(image.toBuffer(), "FortniteStats.png");
       
      message.channel.send({ files: [attachment] });
    }
}