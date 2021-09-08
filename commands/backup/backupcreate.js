const { MessageEmbed, Message, Client } = require('discord.js');
const backup = require("discord-backup");

module.exports = {
    name: 'backupcreate',
    aliases : ['bc'],
    description : "Create a backup of you're server.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      try {
        backup.create(message.guild, {
            jsonBeautify: true
        }).then(async(backupData) => {
            const p = await client.prefix(message)
            message.author.send("The backup has been created! To load it, type this command on the server of your choice: `"+p+"backupload "+backupData.id+"`!");
            message.channel.send(":white_check_mark: Backup successfully created. The backup ID was sent in dm!");
        }).catch((err) => {
          if(!process.env.WEBHOOK || process.env.WEBHOOK === false) return message.reply("An error occurred, please check if the bot is administrator!");
          client.webhookError.send({
            username: message.client.user.username,
            avatarURL: message.client.user.displayAvatarURL(),
            embeds: [
              new MessageEmbed()
              .setAuthor(`An error occurred | backupcreate`, "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F97%2FDialog-error-round.svg%2F768px-Dialog-error-round.svg.png&f=1&nofb=1")
              .setDescription(`\`\`\`${err}\`\`\``)
              .setColor("RED")
              .setTimestamp()
            ],
          })
          return message.reply("An error occurred and a report was sent to the owner but also check if the bot is administrator!.")
        });
      } catch (err) {
        if(!process.env.WEBHOOK || process.env.WEBHOOK === false) return message.reply("An error occurred, please check if the bot is administrator!");
        client.webhookError.send({
          username: message.client.user.username,
          avatarURL: message.client.user.displayAvatarURL(),
          embeds: [
            new MessageEmbed()
              .setAuthor(`An error occurred | cmd-name`, "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F97%2FDialog-error-round.svg%2F768px-Dialog-error-round.svg.png&f=1&nofb=1")
              .setDescription(`\`\`\`${err}\`\`\``)
              .setColor("RED")
              .setTimestamp()
            ],
          })
          return message.reply("An error occurred and a report was sent to the owner but also check if the bot is administrator!.")
      }
    }
}
