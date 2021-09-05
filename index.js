const { ModMailClient } = require("reconlx");
const { Client } = require("discord.js");
const express = require("express");
const path = require('path');
require('dotenv').config()
const app = express();

if(!process.env.TOKEN) {
    console.error("Please provide a valid Discord Bot Token.");
    process.exit(1);
} else if(!process.env.PREFIX) {
    console.error("Please provide a default prefix.");
    process.exit(1);
} else if(!process.env.PORT) {
    console.error("Please provide a port.")
    process.exit(1);
} else if(!process.env.MONGO) {
    console.error("Please provide a mongodb url for the bot.");
    process.exit(1);
} else if(!process.env.GUILD) {
    console.error("Please provide a guild id for mod mail.");
    process.exit(1);
} else if(!process.env.ROLE) {
    console.error("Please provide a role id for mod mail.");
    process.exit(1);
} else if(!process.env.CATEGORY) {
    console.error("Please provide a category id for mod mail.");
    process.exit(1);
} else if(!process.env.TRANSCRIPT) {
    console.error("Please provide a channel id for transcript for mod mail.");
    process.exit(1);
}

const client = new Client({
    intents: 32767,
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
}); 

const modmailClient = new ModMailClient({
    client,
    guildId: process.env.GUILD,
    category: process.env.CATEGORY,
    modmailRole: process.env.ROLE,
    transcriptChannel: process.env.TRANSCRIPT,
    mongooseConnectionString: process.env.MONGO,
});

client.on("ready", async() => {
    modmailClient.ready();
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, '/index.html'));
    });
    app.listen(process.env.PORT);
    console.log(`WebServer ✅ (${process.env.PORT})`);
    await client.guilds.cache.get(process.env.GUILD).commands.create({
        name: 'close',
        description: 'Close the ModMail.',
        options: [{
            name: 'reason',
            type: 'STRING',
            description: 'The reason you want to close this modmail.',
            required: true,
        }],
    });
    console.log(`${client.user.username} ✅`);
});

client.on("messageCreate", async(message) => {
    modmailClient.modmailListener(message);
});

client.on('interactionCreate', async(interaction) => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === 'close') {
        if(!interaction.member.roles.cache.has(process.env.ROLE)) return await interaction.reply({ content: 'You do not have permission.', ephemeral: true });
        const { value: string } = interaction.options.get('reason');
        modmailClient.deleteMail({ channel: interaction.channel.id, string });
        await interaction.reply({ content: 'Close ModMail.', ephemeral: true });
    }
});

client.login(process.env.TOKEN);