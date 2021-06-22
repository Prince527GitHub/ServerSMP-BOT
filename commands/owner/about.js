const { MessageEmbed, Message, Client } = require('discord.js');
const os = require('os');
const si = require('systeminformation');

module.exports = {
    name: 'about',
    category : 'owner',
    usage: '',
    description : "Show's the specs of the pc that is runing the bot!",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
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
            let stats = new MessageEmbed()
            .setAuthor('ServerSMP・hardware')
            .addField("Server Count", `${message.client.guilds.cache.size}` , true)
            .addField('Channel Count' , `${message.client.channels.cache.size}` ,  true)
            .addField('User Count' , `${message.client.users.cache.size}` ,  true)
            .addField('Architecture', `${os.arch()}` , true)
            .addField('Platform', `${os.platform()}` , true)
            .addField('Node-Version', `${process.versionn}` , true)
            .addField('Shards', `${message.client.ws.shards.size}` , true)
            .addField('Cores', `${os.cpus().length}` , true)
            .addField('Ping' , `${message.client.ws.ping}` , true)
            .addField("Uptime" , `My Uptime is: \`${days} day(s),${hours} hours, ${minutes} minutes, ${seconds} seconds\``)
            .addField('Free/Used/Total RAM' , `${Math.round(freeRAM)} MB / ${Math.round(usedRAM)}MB / ${Math.round(totalRAM)} MB`)
            .addField('Memory Used by Bot Process' , `${Math.round(RAM_used_by_bot * 100) / 100} MB`)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
          message.channel.send(stats).catch(console.error);
    }
}
