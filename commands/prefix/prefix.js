const { MessageEmbed, Message, Client } = require('discord.js');
const prefixSchema = require('../../models/prefix')

module.exports = {
    name: 'prefix',
    category : 'prefix',
    usage: '[new prefix]',
    description : "Change the bots prefix!",
    userPermission: ["ADMINISTRATOR"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to.')
        prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.channel.send(`Your prefix has been updated to **${res}**`)
            } else {
                data = new prefixSchema({
                    Guild : message.guild.id,
                    Prefix : res
                })
                data.save()
                message.guild.members.cache.get(client.user.id).setNickname(`[${res}] ${client.user.username}`);
                message.channel.send(`Custom prefix in this server is now set to **${res}**`)
            }
        })
    }
}
