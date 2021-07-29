const { MessageEmbed, Message, Client, version } = require('discord.js');
const os = require('os');

module.exports = {
    name: 'about',
    category : 'owner',
    description : "Send detailed info about the client",
    owner: true,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {

                  let seconds = Math.floor(message.client.uptime / 1000);
                  let minutes = Math.floor(seconds / 60);
                  let hours = Math.floor(minutes / 60);
                  let days = Math.floor(hours / 24);
                  var freeRAM = os.freemem / 1024**2 ;
                  var usedRAM = (os.totalmem() - os.freemem) / 1024**2;
                  var totalRAM = os.totalmem / 1024**2;
                  const RAM_used_by_bot = process.memoryUsage().heapUsed / 1024 / 1024;
                  seconds %= 60;
                  minutes %= 60;
                  hours %= 24;

            const embed = new MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle('Bot Stats')
                .setColor('RANDOM')
                .addFields(
                    {
                        name: '🌐 Servers',
                        value: `\`\`\`md\nServing ${client.guilds.cache.size} servers.\`\`\``,
                        inline: false
                    },
                    {
                        name: '📺 Channels',
                        value: `\`\`\`md\nServing ${client.channels.cache.size} channels.\`\`\``,
                        inline: false
                    },
                    {
                        name: '👥 Users',
                        value: `\`\`\`md\nServing ${client.users.cache.size} users.\`\`\``,
                        inline: false
                    },
                    {
                        name: '🎈 Join Date',
                        value: `\`\`\`md\n${client.user.createdAt.toLocaleDateString("en-us")}\`\`\``,
                        inline: false
                    },
                    {
                        name: '🛠 Discord Version',
                        value: `\`\`\`md\n${version}\`\`\``,
                        inline: false
                    },
                    {
                        name: '💎 Nodejs Version',
                        value: `\`\`\`md\n${process.version}\`\`\``,
                        inline: false
                    },
                    {
                        name: '🖥 ARCH',
                        value: `\`\`\`md\n${os.arch()}\`\`\``,
                        inline: false
                    },
                    {
                        name: '🖥 Platform',
                        value: `\`\`\`md\n${os.platform()}\`\`\``,
                        inline: false
                    },
                    {
                        name: '🖥 CPU',
                        value: `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,
                        inline: false
                    },
                    {
                        name: '🖥 CPU Cores',
                        value: `\`\`\`md\n${os.cpus().length}\`\`\``,
                        inline: false
                    },
                    {
                        name: '🖥 Free/Used/Total RAM',
                        value: `\`\`\`md\n${Math.round(freeRAM)} MB / ${Math.round(usedRAM)}MB / ${Math.round(totalRAM)} MB\`\`\``,
                        inline: false
                    },
                    {
                        name: '🖥 Memory Used by Bot Process',
                        value: `\`\`\`md\n${Math.round(RAM_used_by_bot * 100) / 100} MB\`\`\``,
                        inline: false
                    },
                    {
                        name: '💎 Shards',
                        value: `\`\`\`md\n${message.client.ws.shards.size}\`\`\``,
                        inline: false
                    },
                    {
                        name: '🏓 Ping',
                        value: `\`\`\`md\n${message.client.ws.ping}ms\`\`\``,
                        inline: false
                    },
                    {
                        name: '⌛ Uptime',
                        value: `\`\`\`md\n${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds\`\`\``,
                        inline: true
                    },
                )
            await message.channel.send(embed)
    }
  }
