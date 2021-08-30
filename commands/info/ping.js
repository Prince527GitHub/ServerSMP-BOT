const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nMessage edit ping is message ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
        message.channel.send({ embeds: [embed] })
        msg.delete()
    },
};
