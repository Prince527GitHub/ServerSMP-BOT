const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'avatar',
    category : 'info',
    usage: '[none | id | mention] ',
    aliases : ['av'],
    description : "Returns users avatar",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {

            let mentioned = message.mentions.users.array();

            // If there are no users mentioned, return the user's own avatar.
            if (args.length == 0) {
               let gmem = message.member;

               const embed = new MessageEmbed()
                  .setColor("#542a58")
                  .setImage(message.author.displayAvatarURL({ size: 1024, dynamic: true })) // appears gif dynamically.
                  .setAuthor(message.author.username)

               message.channel.send(embed);
            } else if (args.length == 1) {
               if (mentioned.length == 1) {

                  // This is if someone was mentioned by ping.
                  message.guild.members.fetch(mentioned[0].id).then(gmem => {


                     const embed = new MessageEmbed()
                        .setColor("#542a58")
                        .setAuthor(mentioned[0].username)
                        .setImage(mentioned[0].displayAvatarURL({ size: 1024, dynamic: true })) // appears gif dynamically.

                     message.channel.send(embed);
                  });
               } else { // If a user ID was mentioned instead.
                  message.guild.members.fetch(args[0]).then(gmem => {
                     let gmemuser = gmem.user;
                     const created = gmemuser.createdAt;

                     const embed = new MessageEmbed()
                        .setImage(gmemuser.displayAvatarURL({ size: 1024, dynamic: true }))
                        .setColor("#542a58")
                        .setAuthor(gmemuser.username)

                     message.channel.send(embed);
                  }).catch(err => {
                     message.channel.send("Invalid user ID.");
                  });
               }
            } else {
               message.channel.send("Too many arguments!");
            }

    }
  }
