const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require("discord.js");
//const Nuggies = require('nuggies');

module.exports = {
    //name: 'greroll',
    usage: '<messageID>',
    description : "Reroll a giveaway",
    userPermission: ["MANAGE_GUILD"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('Please provide a message ID to the giveaway!', { allowedMentions: { repliedUser: false } });
        let win;
        try {
            win = await Nuggies.giveaways.reroll(client, args[0]);
        }
        catch (err) {
            console.log(err);
            return message.channel.send('Unable to find the giveaway!');
        }
        if (!win[0]) return message.channel.send('There are not enough people in the giveaway!');
        message.channel.send({ content: `Rerolled! <@${win}> is the new winner of the giveaway!`, components: [new MessageActionRow().addComponents(new MessageButton().setLabel('Giveaway').setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${args[0]}`).setStyle('LINK'))] });
    },
};