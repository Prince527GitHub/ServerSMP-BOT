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
        backup.create(message.guild, {
            jsonBeautify: true
        }).then(async(backupData) => {
            const p = await client.prefix(message)
            message.author.send("The backup has been created! To load it, type this command on the server of your choice: `"+p+"backupload "+backupData.id+"`!");
            message.channel.send(":white_check_mark: Backup successfully created. The backup ID was sent in dm!");
        }).catch(() => {

            return message.channel.send(':x: An error occurred, please check if the bot is administrator!');
    
        });
    }
}
