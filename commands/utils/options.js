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
      if(db.has(`xp-${message.guild.id}`)=== true) {
        xp_command = false
      } else if(db.has(`xp-${message.guild.id}`)=== false) {
        xp_command = true
      }
      if(db.has(`xp-channel-${message.guild.id}`)=== true) {
        xp_channel = db.get(`xp-channel-${message.guild.id}`)
      } else if(db.has(`xp-channel-${message.guild.id}`)=== false) {
        xp_channel = "xxxxxxxxxxxxxxxxxxxx";
      }
      const nsfwchannel = await Client.dashboard.getVal(message.guild.id, "nsfwchannel");
      const nsfwch = await Client.dashboard.getVal(message.guild.id, "nsfwch");
      const themes = await Client.dashboard.getVal(message.guild.id, "themes");
      const byetheme = await Client.dashboard.getVal(message.guild.id, "byetheme");
      const byemain = await Client.dashboard.getVal(message.guild.id, "byemain");
      const byesub = await Client.dashboard.getVal(message.guild.id, "byesub");
      const embed = new MessageEmbed()
        .setTitle("Options")
        .setDescription(`
          **Command Options:**
          **NSFW** - \`${db.has(`nsfw-${message.guild.id}`)}\`
          **Ticket** - \`${db.has(`ticket-${message.guild.id}`)}\`
          **XP** - \`${xp_command}\`
          **XP Channel** - \`${db.has(`xp-ch-on-${message.guild.id}`)}\`
          **XP Channel ID** - \`${xp_channel}\`
          **[Dashboard Options:](https://serversmp.botdash.pro/)**
          **NSFW Channel** - \`${nsfwch}\`
          **NSFW Channel ID** - \`${nsfwchannel}\`
          **Welcome Theme** - \`${themes}\`
          **Goodbye Theme** - \`${byetheme}\`
          **Goodbye Main Text** - \`${byemain}\`
          **Goodbye Sub Text** - \`${byesub}\`
          `)
          .setColor("RANDOM")
        await message.channel.send(embed)
    }
  }
