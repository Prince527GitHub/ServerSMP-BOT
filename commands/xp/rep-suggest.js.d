const { MessageEmbed, Message, Client, MessageActionRow, MessageButton } = require('discord.js');
const textSchemaGuild = require("../../models/textSystem-guild");

module.exports = {
    name: 'rep-suggest',
    usage: '',
    description : "",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      textSchemaGuild.findOne({ Guild: message.guild.id }, (err, data) => {

        if(!data) return message.reply("This server does not have the experimental rep system enabled");

              if(!args[0]) return message.reply("You need a work to suggest.")

              const channel = client.channels.cache.get(process.env.SYSTEMCHNNEL);

              const row = new MessageActionRow()
                  .addComponents(
                      new MessageButton()
                      .setCustomId("delete-current-message")
                      .setLabel("Delete MSG")
                      .setStyle("DANGER")
                      .setEmoji("🚫")
                );

              channel.send({
                  embeds: [
                      new MessageEmbed()
                      .setAuthor("Rep System Suggestion", client.user.displayAvatarURL({
                          dynamic: true
                      }))
                      .setDescription(`This is a suggestion of some words that should be added to the list.\n\n\`${args[0]}\`\n\n`)
                      .setColor("YELLOW")
                      .setTimestamp()
                  ],
                  componets: [row]
              });

      });

    }
  }
