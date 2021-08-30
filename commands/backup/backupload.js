const { MessageEmbed, Message, Client } = require('discord.js');
const backup = require("discord-backup");

module.exports = {
    name: 'backupload',
    usage: '[backupID]',
    aliases : ['bl'],
    description : "Load the backup of you're server.",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {

        const backupID = args.join(' ');

        backup.fetch(backupID).then(() => {
            
            message.channel.send(':warning: All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!');

            const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id, {
                time: 60000,
                max: 1
            });
            collector.on('collect', async(m) => {
                if (!m.content) return collector.stop('error');

                if (!['-confirm', 'cancel'].includes(m.content)) return collector.stop('error');
                if (m.content == '-confirm') return collector.stop('done');
                if (m.content == 'cancel') return collector.stop('cancel');
                
            })
        
            collector.on('end', (collected, reason) => {
                if (reason === 'time') return message.channel.send(':x: Command timed out! Please retry.');
                if (reason == 'error') return message.channel.send('You did not provide valid option!');
                if (reason == 'cancel') return message.channel.send('Cancelled loading of backup!');
                if (reason == 'done') {
                    backup.load(backupID, message.guild).then(() => {
        
                        backup.remove(backupID);
                        return message.author.send('Backup loaded successfully!');
                
                    }).catch((err) => {
                
                        if (err === 'No backup found')
                            return message.channel.send(':x: No backup found for ID '+backupID+'!');
                        else
                            return message.author.send(':x: An error occurred: '+(typeof err === 'string') ? err : JSON.stringify(err));
                
                    });
                }
            })
        
        }).catch(() => {
            return message.channel.send(':x: No backup found for ID '+backupID+'!');
        });

    }
}
