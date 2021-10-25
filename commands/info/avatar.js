const { Message, Client, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases : ['av'],
    usage: '[none | id | mention] ',
    description: "Returns users avatar",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let mentioned = message.mentions.users.first();

        // If there are no users mentioned, return the user's own avatar.
        if (args.length == 0) {

           const embed = new MessageEmbed()
              .setColor("#542a58")
              .setImage(message.author.displayAvatarURL({ size: 4096, dynamic: true })) // appears gif dynamically.
              .setAuthor(message.author.username)

           message.channel.send({ embeds: [embed] });
        } else if (args.length == 1) {
           if (mentioned.length == 1) {

              // This is if someone was mentioned by ping.
              message.guild.members.fetch(mentioned[0].id).then(gmem => {


                 const embed = new MessageEmbed()
                    .setColor("#542a58")
                    .setAuthor(mentioned[0].username)
                    .setImage(mentioned[0].displayAvatarURL({ size: 4096, dynamic: true })) // appears gif dynamically.

                 message.channel.send({ embeds: [embed] });
              });
           } else { // If a user ID was mentioned instead.

                 const embed = new MessageEmbed()
                    .setImage(mentioned.displayAvatarURL({ size: 4096, dynamic: true }))
                    .setColor("#542a58")
                    .setAuthor(mentioned.username)

                 message.channel.send({ embeds: [embed] });
           }
        } else {
           message.channel.send("Too many arguments!");
        }

    },
};
