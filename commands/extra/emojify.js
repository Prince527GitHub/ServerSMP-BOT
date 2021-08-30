const { MessageEmbed, Message, Client } = require('discord.js');
const { Emojify } = require('discord-gamecord');

module.exports = {
    name: 'emojify',
    usage: '[ text ]',
    description : "Emojify some text of your choice.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        if(!args.length) return message.reply('Please specify a text to translate.')

        message.channel.send(await Emojify(args.slice(0).join(" ")));

    }
}