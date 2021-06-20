const { MessageEmbed, Message, Client } = require('discord.js');
const figlet = require('figlet');

module.exports = {
    name: 'text-art',
    category : 'extra',
    usage: '[text]',
    description : "Change your text to ascii art.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        figlet.text(args.join(" "), {
            font: "",
        }, async(err, data) => {
            message.channel.send(`\`\`\`${data}\`\`\``);
        });
    }
}