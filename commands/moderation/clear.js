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
        let int = args[0];
        if (int > 100) int = 50;

        try {
            await message.delete()
            const fetch = await message.channel.messages.fetch({ limit: int });
            const deletedMessages = await message.channel.bulkDelete(fetch, true);

            const results = {};
            for (const [, deleted] of deletedMessages) {
                const user = `${deleted.author.username}#${deleted.author.discriminator}`;
                if (!results[user]) results[user] = 0;
                results[user]++;
            }

            const userMessageMap = Object.entries(results);

            const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? 's' : ''} were removed!\n\n${userMessageMap.map(([user, messages]) => `**${user}** : ${messages}`).join('\n')}`;
            await message.channel.send({ content: finalResult }).then(async (msg) => setTimeout(() => msg.delete(), 5000))
        } catch (err) {
            if (String(err).includes('Unknown Message')) return console.log('[ERROR!] Unknown Message');
        }
    }
}