const { MessageEmbed, Message, Client } = require('discord.js');
const schema = require('../../models/cc');

module.exports = {
    name: 'cc-list',
    category : 'Custom Commands',
    usage: '',
    description : "List the custom commands!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const data  = await schema.find({ Guild: message.guild.id });
        if(!!data === false) return message.channel.send('There is no custom commands!');
        message.channel.send(
            new MessageEmbed()
                .setColor('BLUE')
                .setDescription(
                    data.map((cmd, i) => 
                        `${i + 1}: ${cmd.Command}`
                    ).join('\n')
                )
        )
    }
}