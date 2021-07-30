const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'premium-application',
    category : 'owner',
    usage: '[you or server] [reason for wanting premium]',
    description : "Get premium for you or your guild.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const owner = client.users.cache.get(process.env.OWNER);
        const how = args[0]
        if(!how) return message.reply("Please specify if you want premium or is it for your server (user or guild).")
        const query = args.slice(1).join(' ');;
        if(!query) return message.reply('Please specify a reason why you want premium.');
        const reportEmbed = new MessageEmbed()
            .setTitle('Try to get premium!')
            .addField('Author', message.author.toString(), true)
            .addField('Guild', message.guild.name, true)
            .addField('Guild or User', how, true)
            .addField('Reason', query)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        owner.send(reportEmbed);
        message.channel.send("Send your application for premium for your guild/you")
    }
}
