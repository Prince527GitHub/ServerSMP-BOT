const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'report',
    usage: '[bug]',
    description : "Report a bug to the owner of ServerSMP - BOT.",
    userPermission: ["ADMINISTRATOR"],
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

        const query = args.join(" ");
        if(!query) return message.reply('Please specify the bug.');
        
        const reportEmbed = new MessageEmbed()
            .setTitle('New BUG!')
            .addField('Author', message.author.toString(), true)
            .addField('Guild', message.guild.name, true)
            .addField('Report', query)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        sendstuff.send({ embeds: [reportEmbed] });
        
        message.channel.send("Report has been sent!");
    }
}
