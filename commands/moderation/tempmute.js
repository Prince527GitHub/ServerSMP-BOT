const { MessageEmbed, Message, Client } = require('discord.js');
const ms = require('ms');
const Schema = require('../../models/mute');

module.exports = {
    name: 'tempmute',
    usage: '[@user] [time]',
    category : 'moderation',
    description : "Admins can mute users for some time.",
    userPermission: ["MANAGE_MESSAGES"],
    botPermission: ["MANAGE_ROLES"],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.channel.send('Member is not found.')
        if(!time) return message.channel.send('Please specify a time.')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if(!role) {
            try {
                message.channel.send('Muted role is not found, attempting to create muted role.')

                let muterole = await message.guild.roles.create({
                    data : {
                        name : 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if(Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`)
        await Member.roles.add(role2)
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) {
                new Schema({
                    Guild: message.guild.id,
                    Users: Member.id
                }).save();
            } else {
                data.Users.push(Member.id);
                data.save();
            }
        })
        message.channel.send(`${Member.displayName} is now muted.`)

        setTimeout(async () => {
          Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
              const user = data.Users.findIndex((prop) => prop === Member.id);
              data.Users.splice(user, 1);
              data.save();
              await Member.roles.remove(role2)
              message.channel.send(`${Member.displayName} is now unmuted`)
            })
        }, ms(time))
    }
}
