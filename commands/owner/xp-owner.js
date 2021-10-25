const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: 'xp-owner',
    usage: 'Owner CMD',
    description: "Owner CMD",
    owner: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const query = args[0];

        if(!query) return message.reply(`\`${await client.prefix(message)}xp-owner [ level | xp ] [ userID ] [ guildID ] [ amount ]\`\n**Change level and xp of users.**`)

        const querylower = query.toLowerCase();

        if(querylower === "level") {
            if(!args[1] || !args[2] || !args[3]) return message.reply("Please specify a userid or guild id or amount!")
            Levels.setLevel(args[1], args[2], args[3]);

        } else if(querylower === "xp") {
            if(!args[1] || !args[2] || !args[3]) return message.reply("Please specify a userid or guild id or amount!")
            Levels.setXp(args[1], args[2], args[3]);

        } else return message.reply("Query is incorrect!")

    }
}
