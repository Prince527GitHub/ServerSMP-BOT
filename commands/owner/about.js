const { MessageEmbed, Message, Client, version } = require('discord.js');
const ytdl = require('ytdl-core');
const os = require('os');
const ms = require('ms');

module.exports = {
    name: 'about',
    description : "Send detailed info about the client",
    owner: true,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {

            const guilds = client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .first(15);
            const description = guilds.map((guild, index) => {
               return `${index+1} :: ${guild.name}: ${guild.memberCount} members`
            }).join('\n')

                        var freeRAM = os.freemem / 1024**2 ;
                        var usedRAM = (os.totalmem() - os.freemem) / 1024**2;
                        var totalRAM = os.totalmem / 1024**2;
                        const RAM_used_by_bot = process.memoryUsage().heapUsed / 1024 / 1024;


                      const embed = new MessageEmbed()
                          .setAuthor(`${client.user.username}`)
                          .setColor("#5400FF")
                          .setDescription(`
**Stats:**
\`\`\`asciidoc
Users count         :: ${client.users.cache.size}
Channels count      :: ${client.channels.cache.size}
Guilds count        :: ${client.guilds.cache.size}
Join Date           :: ${client.user.createdAt.toLocaleDateString("en-us")}
Discord.js Version  :: ${version}
Nodejs Version      :: ${process.version}
YTDL Version        :: ${ytdl.version}
ARCH                :: ${os.arch}
Platform            :: ${os.platform}
CPU                 :: ${os.cpus().map(i => `${i.model}`)[0]}
CPU Cores           :: ${os.cpus().length}
Free/Used/Total RAM :: ${Math.round(freeRAM)} MB / ${Math.round(usedRAM)} MB / ${Math.round(totalRAM)} MB
Process Memory      :: ${Math.round(RAM_used_by_bot * 100) / 100} MB
Shards              :: ${message.client.ws.shards.size}
Ping                :: ${message.client.ws.ping}ms
OS Uptime           :: ${ms(os.uptime() * 1000)}
Process Uptime      :: ${ms(process.uptime() * 1000)}
Bot Uptime          :: ${ms(client.uptime, { long: true })}
Source Code         :: https://github.com/Prince527GitHub/ServerSMP-BOT/
\`\`\`
**Server Stats:**
\`\`\`asciidoc
${description}
\`\`\`
                        `)
                  await message.channel.send({ embeds: [embed] })
    }
  }
