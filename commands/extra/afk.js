const { MessageEmbed, Message, Client } = require('discord.js');
const { afk } = require('../../collection/index');

module.exports = {
    name: 'afk',
    category : 'extra',
    usage: '[reason]',
    description : "Make a afk message, so when a player mention you it will say you are afk and when you type a message your afk is done.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const reason = args.join(" ") || 'No Reason!';
        afk.set(message.author.id, [ Date.now(), reason ]);
        message.reply(`You are now afk \`${reason}\``)
    }
}