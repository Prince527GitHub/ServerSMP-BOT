const { MessageEmbed, Message, Client } = require('discord.js');
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: 'create-ticket',
    category : 'ticket',
    description : "Create the main ticket button to create tickets!",
    usage: '[ title ]',
    userPermission: ["ADMINISTRATOR"],

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if(!args.slice(0).join(' ')) return message.reply("You need a title!")
      if(await client.db_json.has(`ticket-${message.guild.id}`)=== false) {
        await client.db_json.set(`ticket-${message.guild.id}`, 0)
      }
      if(!message.guild.roles.cache.find(role => role.name === "ticket-mods")) {
        await message.guild.roles.create({
          data: {
            name: 'ticket-mods',
            color: 'BLUE',
          },
          reason: 'The ticket role for admins and mods',
        })
      }

      const report = new MessageButton()
        .setLabel("Create ticket")
        .setEmoji("📩")
        .setID("report_button")
        .setStyle("grey")
      message.channel.send({
        buttons: report,
        embed: new MessageEmbed()
          .setTitle(`${args.slice(0).join(' ')}`)
          .setDescription("To create a ticket react with :envelope_with_arrow:")
          .setColor("BLUE")
      })
    }
  }
