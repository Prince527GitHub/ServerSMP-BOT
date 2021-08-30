const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: 'kick',
    usage: '[@user]',
    description : "Kick users.",
    userPermission: ["KICK_MEMBERS"],
    botPermission: ["KICK_MEMBERS"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const GuildMember = message.member;

        const target = message.mentions.users.first();
        if(!target) return message.reply({ content: "Who are trying to ban? the chat?" })
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            message.delete();
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("2")
                .setLabel("Approve kick")
                .setStyle("SUCCESS")
                .setEmoji("✅"),
                new MessageButton()
                .setCustomId("1")
                .setEmoji("🚫")
                .setLabel("Dissallow kick")
                .setStyle("DANGER"),
            )
            const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("1")
                .setEmoji("🚫")
                .setLabel("Dissallow kick")
                .setDisabled(true)
                .setStyle("DANGER")
            )
            const filter1 = i => i.customId === "2" && i.user.id;

            const collector = message.channel.createMessageComponentCollector({ filter1 });

            collector.on('collect', async i => {
                if (i.customId === "2") {
                    i.update({ content: "**Member kicked**", components: [] })
                    memberTarget.kick();
                }
            })
            const filter2 = b => b.customId === "1" && i.user.id;

            const collectorr = message.channel.createMessageComponentCollector({ filter2 });
            
            collectorr.on('collect', async b => {
                if (b.customId === "1") {
                    b.update({ content: "**Member not kicked**", components: [] })
                }
            })
            message.channel.send({ content: "**kick command**", components: [row] })
            }

    },
};