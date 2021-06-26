const { MessageEmbed, Message, Client } = require('discord.js');
const schema = require('../../models/cc');

module.exports = {
    name: 'cc-delete',
    category : 'Custom Commands',
    usage: '[name of command]',
    description : "Delete custom commands!",
    userPermission: ["ADMINISTRATOR"],
    guildPremium: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const name = args[0];

        if(!name) return message.channel.send('Please specify a command name');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send('That custom command does not exist!');
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(`Removed **${name}** from custom commands!`);
    }
}
