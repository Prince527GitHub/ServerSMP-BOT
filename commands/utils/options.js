const { MessageEmbed, Message, Client } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'options',
    category : 'utils',
    description : "See options!",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      let xp_command;
      let xp_channel;
      let nsfw_channel;
      let ticket_command;
      if(await db.has(`xp-${message.guild.id}`)=== true) {
        xp_command = false
      } else if(await db.has(`xp-${message.guild.id}`)=== false) {
        xp_command = true
      }
      if(await db.has(`xp-channel-${message.guild.id}`)=== true) {
        xp_channel = `<#${db.get(`xp-channel-${message.guild.id}`)}>`
      } else if(await db.has(`xp-channel-${message.guild.id}`)=== false) {
        xp_channel = "`no channel set`";
      }
      if(await client.mongo_quick.has(`nsfw-ch-${message.guild.id}`)=== false) {
        nsfw_channel = "`no channel set`";
      } else {
        nsfw_channel = `<#${await client.mongo_quick.get(`nsfw-ch-${message.guild.id}`)}>`
      }
      if(client.db_json.has(`ticket-toggle-${message.guild.id}`)=== false) {
        ticket_command = "true"
      } else {
        ticket_command = "false"
      }
      const themes = await Client.dashboard.getVal(message.guild.id, "themes");
      const byetheme = await Client.dashboard.getVal(message.guild.id, "byetheme");
      const byemain = await Client.dashboard.getVal(message.guild.id, "byemain");
      const byesub = await Client.dashboard.getVal(message.guild.id, "byesub");
      const embed = new MessageEmbed()
        .setTitle("Options")
        .setDescription(`
          **Command Options:**
          **NSFW** - \`${await client.mongo_quick.has(`nsfw-${message.guild.id}`)}\`
          **NSFW Channel** - ${nsfw_channel}
          **XP** - \`${xp_command}\`
          **XP Channel** - ${xp_channel}
          **Ticket** - \`${ticket_command}\`
          **Tickets Number** - \`${client.db_json.get(`ticket-${message.guild.id}`)}\`
          **[Dashboard Options:](https://serversmp.botdash.pro/)**
          **Welcome Theme** - \`${themes}\`
          **Goodbye Theme** - \`${byetheme}\`
          **Goodbye Main Text** - \`${byemain}\`
          **Goodbye Sub Text** - \`${byesub}\`
          `)
          .setColor("RANDOM")
        await message.channel.send(embed)
    }
  }
