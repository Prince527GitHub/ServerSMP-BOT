const { MessageEmbed, Message, Client } = require('discord.js');
const figlet = require('figlet');

module.exports = {
    name: 'ascii',
    usage: '[ text ]',
    description : "Change your text to ascii art.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {

        try {
            figlet.text(args.join(" "), {
                font: "",
            }, async(err, data) => {
                message.channel.send(`\`\`\`${data.slice(0, 1980)}\`\`\``).catch((err) => {
                    if(process.env.WEBHOOK === false) return message.reply("An error occurred.");
                    client.webhookError.send({
                        username: message.client.user.username,
                        avatarURL: message.client.user.displayAvatarURL(),
                        embeds: [
                            new MessageEmbed()
                                .setAuthor("An error occurred | text-art", "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F97%2FDialog-error-round.svg%2F768px-Dialog-error-round.svg.png&f=1&nofb=1")
                                .setDescription(`\`\`\`${err}\`\`\``)
                                .setColor("RED")
                                .setTimestamp()
                        ],
                    })
                    return message.reply("An error occurred.")
                });
            });
        } catch (err) {
            if(process.env.WEBHOOK === false) return message.reply("An error occurred.");
            client.webhookError.send({
                username: message.client.user.username,
                avatarURL: message.client.user.displayAvatarURL(),
                embeds: [
                    new MessageEmbed()
                        .setAuthor("An error occurred | text-art", "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F97%2FDialog-error-round.svg%2F768px-Dialog-error-round.svg.png&f=1&nofb=1")
                        .setDescription(`\`\`\`${err.slice(0, 1940)}\`\`\``)
                        .setColor("RED")
                        .setTimestamp()
                ],
            })
            return message.reply("An error occurred and a report was sent to the owner.")
        }

    }
}
