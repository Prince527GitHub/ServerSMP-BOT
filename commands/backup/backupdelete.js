const { MessageEmbed, Message, Client } = require('discord.js');
const backup = require("discord-backup");

module.exports = {
    name: 'backupdelete',
    category : 'backup',
    usage: '[backupID]',
    aliases : ['bd'],
    description : "Delete a backup.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
        }
        let backupID = args[0];
        if(!backupID){
            return message.channel.send(":x: | You must specify a valid backup ID!");
        }
        backup.remove(backupID);
        let embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setTitle("Backup delete")
        .setDescription("Deleted backup `"+backupID+"`.")
        message.channel.send(embed)
    }
}
