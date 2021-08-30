const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'set-avatar',
    usage: '[ url of image ]',
    aliases : ['set-avatar-bot'],
    description : "Set avatar bot.",
    owner: true,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      let avatarurl = args.join(" ");
      if (!avatarurl) return message.channel.send(`Usage: setavatarbot <url>`)
      client.user.setAvatar(`${avatarurl}`)
      let embed = new Discord.MessageEmbed()
          .setTitle('New Avatar Set')
          .setImage(`${avatarurl}`)
          .setTimestamp()
       message.channel.send({ embeds: [embed] })
       .catch(e => {
           console.log(e)
           return message.channel.send("Something Went Wrong!")
       })
    }
  }
