const { MessageEmbed, Message, Client } = require('discord.js');
const backup = require("discord-backup");
const prefix = process.env.PREFIX;

module.exports = {
    name: 'backupcreate',
    category : 'backup',
    usage: '',
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
            maxMessagesPerChannel: 20,
            jsonBeautify: true
        }).then((backupData) => {
            message.author.send("The backup has been created! To load it, type this command on the server of your choice: `"+prefix+"backupload "+backupData.id+"`!");
            message.channel.send(":white_check_mark: Backup successfully created. The backup ID was sent in dm!");
        });
    }
}
