const { MessageEmbed, Message, Client } = require('discord.js');
const Userstats = require("../../models/user-stats");

module.exports = {
    name: 'cmd-stats',
    description : "Global stats for cmds.",
    owner: true,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      const cmd = [];
      const data = await Userstats.find()
      await data.map(async(val, i) => {
        const userParsed = await client.users.fetch(val.User);
        cmd.push(`**${i + 1}**. - *${userParsed.username}#${userParsed.discriminator}*\nCMDs: \`${val.CmdUsed}\``);
      });
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle("CMD stats")
            .setDescription(`${await cmd.splice(0, 10).join("\n\n")}`)
            .setColor("RANDOM")
        ]
      });
    }
  }
