const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "purge",
    description: "remove messages",
    userPermissions: ["MANAGE_MESSAGES"],
    options: [
        {
            name: "amount",
            type: "INTEGER",
            description: "amount of messages that is gonna be deleted",
            required: true
        },
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const int = interaction.options.getInteger("amount");
        if(int > 100) return interaction.followUp({ content: "The maximum amount of messages you can delete is 100 messages" });

        try {
            const deletedMessages = await interaction.channel.bulkDelete(int + 1, true);

            const results = {};
            for (const [, deleted] of deletedMessages) {
                const user = `${deleted.author.username}#${deleted.author.discriminator}`;
                if (!results[user]) results[user] = 0;
                results[user]++;
            }

            const userMessageMap = Object.entries(results);

            const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? 's' : ''} were removed!\n\n${userMessageMap.map(([user, messages]) => `**${user}** : ${messages}`).join('\n')}`;
            await interaction.channel.send({ content: finalResult }).then(async (msg) => setTimeout(() => msg.delete().catch(err => {return}), 5000));
        } catch (err) {
            if (String(err).includes('Unknown Message')) return console.log('[ERROR!] Unknown Message');
        }
    },
};
