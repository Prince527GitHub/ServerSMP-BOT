const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'clear',
    aliases : ['purge'],
    usage: '[1-50]',
    description : "Admins can clear messages.",
    userPermission: ["MANAGE_MESSAGES"],
    botPermission: ["MANAGE_MESSAGES"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let deleteAmount;
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.reply('Please put a number only!') }
        if (parseInt(args[0]) > 50) {
            return message.reply('You can only delete 50 messages at a time!')
        } else {
            deleteAmount = parseInt(args[0]);
        }
        message.channel.bulkDelete(deleteAmount + 1, true);
        message.reply(`**Successfully** Deleted ***${deleteAmount}*** Messages.`)
    }
}