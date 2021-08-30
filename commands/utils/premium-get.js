const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: "premium-application",
    usage: "[ user | guild] [ reason for wanting premium ]",
    description: "Get premium for you or guild.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {

        let sendstuff;
        
        if(process.env.REPORT.split(', ', 2).splice(0, 1).toString().toUpperCase() === "USER") {
            sendstuff = client.users.cache.get(process.env.REPORT.split(', ', 2).splice(1).toString());
        } else if(process.env.REPORT.split(', ', 2).splice(0, 1).toString().toUpperCase() === "SERVER") {
            sendstuff = client.channels.cache.get(process.env.REPORT.split(', ', 2).splice(1).toString());
        } else return message.reply("Owner did not set options correct.");

        const how = args[0]
        if(!how) return message.reply("Please specify if you want premium or is it for your server (user or guild).")

        const query = args.slice(1).join(' ');
        if(!query) return message.reply('Please specify a reason why you want premium.');

        if(how.toLowerCase() === "user") {
            sendstuff.send({ embeds: [
                new MessageEmbed()
                    .setTitle(`Premium application: \`${how.toUpperCase()}\``)
                    .setDescription(`Reason: \`${query}\``)
                    .addField("User", `Name: \`${message.author.name}\` ID: \`${message.author.id}\``)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
            ]})
        } else if(how.toLowerCase() === "guild") {
            sendstuff.send({ embeds: [
                new MessageEmbed()
                    .setTitle(`Premium application: \`${how.toUpperCase()}\``)
                    .setDescription(`Reason: \`${query}\``)
                    .addField("Guild", `Name: \`${message.guild.name}\` ID: \`${message.guild.id}\``)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
            ]})
        } else return message.reply("Please specify if you want premium or is it for your server (user or guild).")

        message.channel.send("Send your application for premium!")
        
    }
}
