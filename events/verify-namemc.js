const client = require('../index.js')
const { message, MessageEmbed } = require('discord.js')

client.on("message", message => {
   if (message.content.includes("namemc, how do i verify")) {
      const user = message.author;
      message.channel.send(new MessageEmbed()
         .setTitle("How To Claim: NameMC")
         .setDescription(`Hey ${user.username}, \n` +
            'To claim your NameMC account, please join the minecraft server `blockmania.com` and type `/namemc` when you have connected. \n' +
            '\n' +
            'Please note that joining BlockMania requires you to have a **Premium** Minecraft Account (you must have paid for Minecraft.) \n' +
            `If you cannot run the command /namemc, try joining on regular Minecraft (unmodded vanilla) as sometimes chat settings can be hidden by mods.`)
         .setColor("#90e78d")
      )
   }
});
