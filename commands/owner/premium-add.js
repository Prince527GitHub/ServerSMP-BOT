const { MessageEmbed, Message, Client } = require('discord.js');
const schema = require('../../models/premium');

module.exports = {
    name: 'premium-add',
    category : 'owmer',
    usage: '[server id]',
    description : "I add premium to guild!",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
        const id = args[0];
        const data = await schema.findOne({ Guild: id });
        if(data) return message.channel.send('This server is already premium!');
        const newData =  new schema({
            Guild: id,
        })
        await newData.save();
        message.channel.send(`Added ${id} to premium!`);
    }
}
