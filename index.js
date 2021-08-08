const { Collection, Client, Discord, MessageEmbed, Intents } = require('discord.js')
const fs = require('fs')
const client = new Client({ disableEveryone: true, partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"], ws: { intents: Intents.all } });
require('discord-buttons')(client);
require('discord-slider')(client);
require('@weky/inlinereply');
require('dotenv').config();
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const mongo = process.env.MONGO
const distoken = process.env.DISTOKEN;
const botdashAPI = process.env.BOTDASH;
const owner = process.env.OWNER;
module.exports = client;
if (!token) {
  console.error("Please provide a valid Discord Bot Token.");
  process.exit(1);
} else if (!prefix) {
  console.error("Please provide a prefix for the bot.");
  process.exit(1);
} else if (!mongo) {
  console.error("Please provide a mongodb url for the bot.");
  process.exit(1);
} else if (!owner) {
  console.error("Please provide your user id.");
  process.exit(1);
} else if (!botdashAPI) {
  console.error("Please provide your botdash api token.");
  process.exit(1);
} else if (!distoken) {
  console.error("Please specify your disbot token or false on distoken.");
  process.exit(1);
}
if (distoken !== "false") {
  const DISBOT = require("disbots.net");
  const disbot = new DISBOT(distoken, {
    statsInterval: 4000000
  }, client);
  disbot.on("postServers", () => {
    console.log("Server count ✅");
  });
  disbot.on("postShards", () => {
    console.log("Shards count ✅");
  });
}
const mongoose = require('mongoose');
const blacklistserver = require('./models/blacklist');
const prefixSchema = require('./models/prefix');
const premiumUSchema = require('./models/premium-user');
const premiumGSchema = require('./models/premium-guild');
const commandstoggle = require('./models/command');
const modlogsSchema = require('./models/modlogs');
const customcom = require('./models/cc');
const eco = require('./models/economy')
const Levels = require('discord-xp');
const Nuggies = require('nuggies');
const Timeout = new Collection();
const ms = require('ms')
const db = require('quick.db')
const botdash = require('botdash.pro');
const { DiscordTogether } = require('discord-together');
const DisTube = require('distube');
const { DiscordUNO } = require("discord-uno");
const { DiscordTicket } = require('discord_ticket_maker');
Levels.setURL(mongo);
Nuggies.connect(mongo)
Nuggies.handleInteractions(client)
mongoose.connect(mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log('MongoDB ✅'));
client.prefix = async function(message) {
  let custom;
  const data = await prefixSchema.findOne({
      Guild: message.guild.id
    })
    .catch(err => console.log(err))
  if (data) {
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

client.on('message', async message =>{
    if(message.author.bot) return;
    const p = await client.prefix(message)
    if(!message.content.startsWith(p)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    if (message.content.length > 2048) return;
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    const data = await customcom.findOne({ Guild: message.guild.id, Command: cmd });
    if(data) message.channel.send(data.Response);
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if(!message.member.permissions.has(command.userPermission || [])) return message.channel.send("You do not have permission to use this command!");
        if(!message.guild.me.permissions.has(command.botPermission || [])) return message.channel.send("I do not have permission to use this command!");
        const blacklisted = await blacklistserver.findOne({ Server: message.guild.id });
        if(blacklisted) return message.reply("This server has been blacklisted.");
        const check = await commandstoggle.findOne({ Guild: message.guild.id })
        if(check) {
          if(check.Cmds.includes(command.name)) return message.channel.send('This command has been disabled by admins.');
        }
        if(command.userPremium && !(await premiumUSchema.findOne({ User: message.author.id }))) return message.reply("You need to upgrade to premium to use this command!");
        if(command.cooldown) {
          if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
          command.run(client, message, args)
          Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
          setTimeout(() => {
              Timeout.delete(`${command.name}${message.author.id}`)
          }, command.cooldown)
        }
        if(command.owner) {
          if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
        }
        if(command.guildPremium) {
          premiumGSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply('This is a premium command!');
            if(!data.Permanent && Date.now() > data.Expire) {
              data.delete();
              return message.reply("The premium system is expired!");
          }
          if(command.cooldown) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
          }
        })
      } else command.run(client, message, args);
    }
});

client.ticket = new DiscordTicket()

const player = new DisTube(client, {
  searchSongs: true,
  emitNewSongOnly: true,
  leaveOnFinish: true
});

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

player
  .on("playSong", (message, queue, song) => message.channel.send(
    new MessageEmbed()
        .setDescription(`▶ **|** Started playing: **[${song.name}](${song.url})**`)
        .setThumbnail(`${song.thumbnail}`)
        .setColor("#5400FF")
  ))
  .on("addSong", (message, queue, song) => message.channel.send(
    new MessageEmbed()
        .setDescription(`✅ **|** **[${song.name}](${song.url})** has been added to the queue`)
        .setThumbnail(`${song.thumbnail}`)
        .setColor("#5400FF")
  ))
  .on("playList", (message, queue, playlist, song) => message.channel.send(
    new MessageEmbed()
        .setDescription(`✅ **|** All videos in **[${playlist.name}](${playlist.url})** playlist has been added to the queue`)
        .setThumbnail(playlist.thumbnail)
        .setColor("#5400FF")
  ))
  .on("addList", (message, queue, playlist) => message.channel.send(
    new MessageEmbed()
        .setDescription(`Adding all videos in **[${playlist.name}](${playlist.url})** playlist, please wait...`)
        .setThumbnail(playlist.thumbnail)
        .setColor("#5400FF")
  ))
  .on("searchResult", (message, result) => {
    let i = 0;
    message.channel.send(
        new MessageEmbed()
            .setTitle("Select a song!")
            .setDescription(`\`\`\`${result.map(song => `${++i} - ${song.name}`).join("\n")}\`\`\`` + "\nPlease select one of the results ranging from **\`1-15\`**")
            .setFooter("• Type cancel or c to cancel the music selection")
            .setAuthor("Music Selection", message.client.user.displayAvatarURL())
            .setColor("#5400FF")
    )})
  .on("searchCancel", (message) => message.channel.send(
    new MessageEmbed()
        .setDescription("None or invalid value entered, the music selection has canceled")
        .setColor("YELLOW")
  ))
  .on("error", (message, e) => {
    console.error(e)
    message.channel.send(
        new MessageEmbed()
            .setColor("RED")
            .setDescription(`An error occurred while playing music, reason: **\`${e}\`**`)
    )})
  .on("noRelated", (message) => message.channel.send(
    new MessageEmbed()
        .setDescription("Can't find related video to play. Stop playing music.")
        .setColor("RED")
  ))
  .on("initQueue", (queue) => {
    queue.autoplay = false;
    queue.volume = 50;
  })
  .on("finish", async(message) => message.channel.send(
    new MessageEmbed()
        .setDescription(`⏹ **|** The music has ended, use **\`${await client.prefix(message)}play\`** to play some music`)
        .setColor("5400FF")
  ))
  .on("empty", (message) => message.channel.send(
    new MessageEmbed()
        .setTitle("Music Player Stopped")
        .setDescription("⏹ **|** Everyone has left from the voice channel. To save resources, the queue has been deleted.")
        .setColor("YELLOW")
  ));

Client.player = player;

Client.discordTogether = new DiscordTogether(client);

Client.dashboard = new botdash.APIclient(botdashAPI);

client.bal = (id, coins) => new Promise(async ful => {
  const data = await eco.findOne({
    id
  });
  if (!data) return ful[0];
  ful(data.coins);
})

client.add = (id, coins) => {
  eco.findOne({
    id
  }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins += coins;
    } else {
      data = new eco({
        id,
        coins
      });
    }
    data.save();
  })
}

client.rmv = (id, coins) => {
  eco.findOne({
    id
  }, async (err, data) => {
    if (err) throw err;
    if (data) {
      data.coins -= coins;
    } else {
      data = new eco({
        id,
        coins: -coins
      });
    }
    data.save();
  })
}

client.formatNumber = n => {
  if (n < 1e4) return n;
  if (n >= 1e4 && n < 1e6) return +(n / 1000).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12 && n < 1e15) return +(n / 1e12).toFixed(1) + "T";
  if (n >= 1e15 && n < 1e18) return +(n / 1e15).toFixed(1) + "qD";
  if (n >= 1e18 && n < 1e21) return +(n / 1e18).toFixed(1) + "Qn";
};

client.modlogs = async function({ Member, Action, Color, Reason }, message) {
  const data = await modlogsSchema.findOne({ Guild: message.guild.id })
  if(!data) return;
  const channel = message.guild.channels.cache.get(data.Channel);
  const logsEmbed = new MessageEmbed()
    .setColor(Color)
    .setDescription(`Reason/changed: ${Reason || 'No Reason!'}`)
    .addField('Member', `${Member.user.tag} (${Member.id})`)
    .setThumbnail(Member.user.displayAvatarURL())
    .setTitle(`Action Took: ${Action}`)
  channel.send(logsEmbed);
};

client.discordUNO = new DiscordUNO();

client.login(token)
