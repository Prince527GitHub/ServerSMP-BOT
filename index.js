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
    })
    app.listen(process.env.PORT)
    console.log(`WebServer ✅ (${process.env.PORT})`);
    console.log(`${client.user.username} ✅`);
});

client.on("messageCreate", async(message) => {
    modmailClient.modmailListener(message);
    if(message.author.bot || !message.guild || !message.content.startsWith(process.env.PREFIX)) return;
    if(message.guild.id !== process.env.GUILD) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    if(message.content === `${process.env.PREFIX}close`) {
        const reason = args.join(" ") || "no reason";
        modmailClient.deleteMail({ channel: message.channel.id, reason });
    }
});

client.login(process.env.TOKEN);