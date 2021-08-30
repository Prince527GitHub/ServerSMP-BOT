const { MessageEmbed, Message, Client } = require('discord.js');
const schema = require('../../models/cc');

module.exports = {
    name: 'cc-create',
    usage: '[name] [what it do]',
    description: "Create custom commands!",
    userPermission: ["ADMINISTRATOR"],
    guildPremium: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Please specify a command name');
        if(!response) return message.channel.send('Please specify a response');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('This custom commands exists already!');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Saved **${name}** as a custom command!`);
    }
}
