const { MessageEmbed, Message, Client } = require('discord.js');
const backup = require("discord-backup");
const config = require('../../config.json')
const prefix = config.prefix

module.exports = {
    name: 'backupcreate',
    category : 'backup',
    usage: '',
    aliases : ['bc'],
    description : "Create a backup of you're server.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | You must be an administrator of this server to request a backup!");
        }
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            message.author.send("The backup has been created! To load it, type this command on the server of your choice: `"+prefix+"backupload "+backupData.id+"`!");
            message.channel.send(":white_check_mark: Backup successfully created. The backup ID was sent in dm!");
        });
    }
}