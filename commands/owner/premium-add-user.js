const { MessageEmbed, Message, Client } = require('discord.js');
const schema = require('../../models/premium-user');

module.exports = {
    name: 'premium-add-user',
    category : 'owner',
    usage: '[user id]',
    aliases : ['pau'],
    description : "Add user to preium",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
        const id = args[0];
        const data = await schema.findOne({ User: id });
        if(data) return message.channel.send('This user is already has premium!');
        const newData =  new schema({
            User: id,
        })
        await newData.save();
        message.channel.send(`User added to premium!`);
    }
}
