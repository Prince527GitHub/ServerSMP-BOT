const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'server',
    category : 'info',
    usage: '',
    description : "Give's info on the server that you are on.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle(`Server - ${message.guild.name}`)
        .setColor("RANDOM")
        .setImage((String(((message.guild).iconURL({ dynamic: true })))))
        .addField('Name:', `${message.guild.name}`)
        .addField('Server Owner:', `${message.guild.owner.user.username}`)
        .addField('Members:', `${message.guild.memberCount}`)
        .addField('Boost Level:', `${message.guild.premiumTier}`)
        .addField('Icon:', `${message.guild.iconURL({ dynamic: true })}`)
        message.channel.send(embed);
    }
}