const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'report',
    category : 'owner',
    usage: '[bug]',
    description : "Report a bug to the owner of ServerSMP - BOT.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You need `ADMINISTRATOR` to report a bug to the owner.")
        const owner = client.users.cache.get(process.env.OWNER);
        const query = args.join(" ");
        if(!query) return message.reply('Please specify a query.');
        const reportEmbed = new MessageEmbed()
            .setTitle('New BUG!')
            .addField('Author', message.author.toString(), true)
            .addField('Guild', message.guild.name, true)
            .addField('Report', query)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        owner.send(reportEmbed);
        message.channel.send("The report was sent to the owner!");
    }
}
