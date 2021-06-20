const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
});
require('discord-buttons')(client);
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
const mongo = config.mongo
module.exports = client;
const DB = require("disbots.net");
const db = new DB("iJFPc9yh1xWIhg0VGy5JRKw7R5dusj8ihAlBirmOFg75LNoL5xaqoafRucpIKACe", { statsInterval: 4000000 }, client);
db.on("postServers", () => {
    console.log("Server count ✅");
});
db.on("postShards", () => {
    console.log("Shards count ✅");
});
const mongoose = require('mongoose');
const blacklistserver = require('./models/blacklist');
const prefixSchema = require('./models/prefix');
const customcom = require('./models/cc');
const Levels = require('discord-xp');
const botdash = require('botdash.pro');
const express = require("express");
const app = express();
const _PORT = config.port || 8080;
Levels.setURL(mongo);
mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true  
}).then(console.log('Connected to mongo db!'));
client.prefix = async function(message) {
    let custom;

    const data = await prefixSchema.findOne({ Guild : message.guild.id })
        .catch(err => console.log(err))
    
    if(data) {
        custom = data.Prefix;
    } else {
        custom = prefix;
    }
    return custom;
}
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    client.user.setPresence({status: 'dnd',activity: {name: `DiamondGolurk on youtube.com`,type: "WATCHING"}})
    console.log(`${client.user.username} ✅`)
    const socketStats = require("socketstats");
    const server = new socketStats(app, client);
    server.listen(_PORT, () => {
        console.log("Listening to port: "+_PORT);
    });
})
client.on('message', async message =>{
    if(message.author.bot) return;
    const p = await client.prefix(message)
    if(!message.content.startsWith(p)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    const data = await customcom.findOne({ Guild: message.guild.id, Command: cmd });
    if(data) message.channel.send(data.Response);
    let command = client.commands.get(cmd)
    if(command) {
        const blacklisted = await blacklistserver.findOne({ Server: message.guild.id });
        if(blacklisted) return message.reply("This server has been blacklisted.")
    }
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
});

const DisTube = require('distube');
const player = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true });

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

player
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    })
    .on("finish", message => message.channel.send("No more song in queue")
    )
    .on("empty", message => message.channel.send("Channel is empty. Leaving the channel")
    );

Client.player = player;

const { DiscordTogether } = require('discord-together');
Client.discordTogether = new DiscordTogether(client);

Client.dashboard = new botdash.APIclient("3856da55-f3b3-462f-9186-0bf72c9b35a7");

client.login(token)
