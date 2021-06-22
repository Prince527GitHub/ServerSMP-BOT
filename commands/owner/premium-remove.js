const { MessageEmbed, Message, Client } = require('discord.js');
const Schema = require('../../models/premium');

module.exports = {
    name: 'premium-remove',
    category : 'owmer',
    usage: '[server id]',
    description : "I remove premium from guild!",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
        const id = args[0];
        Schema.findOne({ Guild: id }, async(err, data) => {
            if(!data) return message.reply('That guild id does not exist in the database!');
            data.delete();
        message.reply(`Server was deleted from premium successfully!`);
        })
    }
}
