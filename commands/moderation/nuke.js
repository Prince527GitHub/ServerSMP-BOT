const { MessageEmbed, Message, Client } = require('discord.js');
const { antijoin } = require('../../collection/index');

module.exports = {
    name: "nuke",
    aliases: ["nukechannel", "channelnuke", "channelclear", "clearchannel"],
    cooldown: 1000 * 120,
    description: "This command deletes all messages in the channel it was ran in.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      message.channel.clone({ position: message.channel.rawPosition }).then(channel => {
        channel.send({ content: "Channel has been nuked." })
        message.channel.delete()
        .catch (e => {
          return message.followUp({content: 'Something went wrong! If you think this is a bug, make sure to report it to our devs by joining the support server!'})
        });
      });
    }
}
