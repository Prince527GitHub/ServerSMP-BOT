const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
var generator = require('generate-password');

module.exports = {
    name: 'password',
    category : 'extra',
    usage: '[1-100]',
    description : "Generate random passworld from 1 - 100 and sends it in DMs.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const number = Number(args[0])
        if(!number) return message.channel.send(String('Enter a password length equal to or less than 100 please :)'))
        if(number > 100 || number < 1) return message.channel.send(String('The password length is not a valid number :), enter a number between 1 to 100'))
        var password = generator.generate({
          length: number,
          numbers: true
        });
        message.member.send(`||\`${password}\`||`);
        message.channel.send(String('A random password has been sent to your DMs'))
    }
}