const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'antivc',
    usage: '[@user]',
    description : "Stop a user from joining vc.",
    userPermission: ["MANAGE_ROLES"],
    botPermission: ["MANAGE_ROLES"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply("Please specify a member!")
        let role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
        if(!role) {
            try {
                message.channel.send("Attempting to create antivc role!");
                role = await message.guild.roles.create({ name: 'antivc', permissions: [] });
                message.guild.channels.cache.filter((c) => c.type === 'voice').forEach(async channel => {
                    await channel.permissionOverwrites.create(role, {
                        VIEW_CHANNEL: true,
                        CONNECT: false
                    });
                });
                message.channel.send("Role has been created!");
            } catch (error) {
                console.log(error);
            }
        }
        await target.roles.add(role.id);
        message.channel.send(`${target} has been anti vc-ed!`)
    }
}