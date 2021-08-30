const { MessageEmbed, Collection } = require('discord.js');
const premiumGSchema = require('../models/premium-guild');
const premiumUSchema = require('../models/premium-user');
const blacklistserver = require('../models/blacklist');
const commandstoggle = require('../models/command');
const prefixSchema = require('../models/prefix');
const customcom = require('../models/cc');
const client = require("../index");
const Timeout = new Collection();
const ms = require("ms");

client.on("messageCreate", async (message) => {

    if (
        message.author.bot ||
        !message.guild
    )
        return;

        const prefix = async function(message) {
          let custom;
          const data = await prefixSchema.findOne({
              Guild: message.guild.id
            })
            .catch(err => console.log(err))
          if (data) {
            custom = data.Prefix;
          } else {
            custom = process.env.PREFIX;
          }
          return custom;
        }
      const p = await prefix(message);

      if(!message.content.toLowerCase().startsWith(p)) return;

    const [cmd, ...args] = message.content
        .slice(p.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    const data = await customcom.findOne({ Guild: message.guild.id, Command: cmd });
    if(data) message.channel.send(data.Response);

    if (!command) return;
    if (command) {
        
        const blacklisted = await blacklistserver.findOne({ Server: message.guild.id });
        if(blacklisted) return message.reply("This server has been blacklisted.");

        if(!message.member.permissions.has(command.userPermission || [])) return message.channel.send("You do not have permission to use this command!");
        if(!message.guild.me.permissions.has(command.botPermission || [])) return message.channel.send("I do not have permission to use this command!");
        
        if (command.owner) {
            if (!process.env.OWNER.split(', ').includes(message.author.id))
            return message.channel.send({ embeds: [
                 new MessageEmbed()
                    .setColor("RED")
                    .setDescription( "This command can only be used by the owners!" )
            ]})
        }
        
        const check = await commandstoggle.findOne({ Guild: message.guild.id })
        if(check) {
          if(check.Cmds.includes(command.name)) return message.channel.send('This command has been disabled by admins.');
        }
        
        if(command.userPremium && !(await premiumUSchema.findOne({ User: message.author.id }))) return message.reply("You need to upgrade to premium to use this command!");

        if (command.cooldown) {
            if (Timeout.has(`${command.name}${message.author.id}`))
                return message.channel.send(
                    `You are on a \`${ms(
                        Timeout.get(`${command.name}${message.author.id}`) - Date.now(),
                        { long: true }
                    )}\` cooldown.`
                );
            Timeout.set(
                `${command.name}${message.author.id}`,
                Date.now() + command.cooldown
            );
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`);
            }, command.cooldown);
        }

        if(command.guildPremium) {
            await premiumGSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(!data) return message.reply('This is a premium command!');
              if(!data.Permanent && Date.now() > data.Expire) {
                  data.delete();
                  return message.reply("The premium system is expired!");
              }
              await command.run(client, message, args);
          })
        } else await command.run(client, message, args);

    }
});
