const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'steal',
    category : 'extra',
    usage: '[emoji] [emoji] [emoji] [emoji] [emoji]',
    description : "Take emojis from other servers and add them to your server.",
    userPermission: ["MANAGE_MESSAGES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args.length) return message.reply("Please specify some emoji!");
        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);
            if(parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name)
                    .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``));
            }
        }
    }
}
