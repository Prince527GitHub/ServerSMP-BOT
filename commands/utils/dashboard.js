const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = {
    name: 'dashboard',
    category : 'utils',
    usage: '',
    description : "Get the dashboard link and the settings you have!",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const nsfwchannel = await Client.dashboard.getVal(message.guild.id, "nsfwchannel");
        const nsfwch = await Client.dashboard.getVal(message.guild.id, "nsfwch");
        const themes = await Client.dashboard.getVal(message.guild.id, "themes");
        const byetheme = await Client.dashboard.getVal(message.guild.id, "byetheme");
        const byemain = await Client.dashboard.getVal(message.guild.id, "byemain");
        const byesub = await Client.dashboard.getVal(message.guild.id, "byesub");
        const ticket = await Client.dashboard.getVal(message.guild.id, "ticket");
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Dashboard")
        .setDescription("The dashboard is [here](https://serversmp.botdash.pro/)!")
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setThumbnail('https://serversmp.netlify.app/assets//disconnect.png')
        .addField('𝗡𝗦𝗙𝗪:', "The settings for the NSFW commands!")
        .addField('NSFW Only in NSFW Channel', `\`${nsfwch}\``)
        .addField('NSFW Channel ID', `\`${nsfwchannel}\``)
        .addField('𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝗖𝗮𝗿𝗱:', "The settings for the welcome cards!")
        .addField('Theme', `\`${themes}\``)
        .addField('𝗚𝗼𝗼𝗱𝗯𝘆𝗲 𝗖𝗮𝗿𝗱:', "The settings for the goodbye cards!")
        .addField('Theme', `\`${byetheme}\``)
        .addField('Main Text', `\`${byemain}\``)
        .addField('Sub Text', `\`${byesub}\``)
        .addField('𝐓𝐢𝐜𝐤𝐞𝐭:', "The settings for the ticket system!")
        .addField('Ticket commands', `\`${ticket}\``)
        .setTimestamp()
        message.channel.send(embed)
    }
}
