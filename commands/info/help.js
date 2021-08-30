const { Message, Client, MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed, Interaction } = require("discord.js");
const { readdirSync } = require("fs");
const db = require('quick.db');

module.exports = {
    name: "help",
    description: "List all the commands.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
    const prefix = await client.prefix(message);
    const color = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;
        if (!args[0]) {
            let categories = [];

            //categories to ignore.
            let ignored;
            if(db.has(`nsfw-${message.guild.id}`)=== false) {
              ignored = [
                  "nsfw",
              ];
            } else {
                if(await client.db_mongo.has(`nsfw-ch-${message.guild.id}`)=== true) {
                    if (message.channel.id === await client.db_mongo.get(`nsfw-ch-${message.guild.id}`)) {
                      ignored = [];
                    } else {
                      ignored = [
                          "nsfw",
                      ];
                    }
                } else {
                  ignored = [
                      "nsfw",
                  ];
                }
            }

            readdirSync("./commands/").forEach((dir) => {
              if (ignored.includes(dir.toLowerCase())) return;
              const name = `${[dir.toLowerCase()]}`;
              let cats = new Object();

              cats = {
                name: name,
                value: `\`${prefix}help ${dir.toLowerCase()}\``,
                inline: true,
              };

              categories.push(cats);
              //cots.push(dir.toLowerCase());
            });

            const embed = new MessageEmbed()
              .setTitle("📬 Need help?")
              .setDescription(
                `\`\`\`js\nPrefix: ${prefix}\nExtra information: If you seen error or bugs please use ${prefix}report to report it! 'If commands dont not work the bot may need more perms!'\`\`\`\n> To check out a category, use command \`${prefix}help [category-name]\``
              )
              .addFields(categories)
              .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({
                  dynamic: true,
                })
              )
              .setTimestamp()
              .setThumbnail(
                client.user.displayAvatarURL({
                  dynamic: true,
                })
              )
              .setColor(color);

            return message.channel.send({ embeds: [embed] });
          } else {
            let cots = [];
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
              if (dir.toLowerCase() !== args[0].toLowerCase()) return;
              const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                file.endsWith(".js")
              );

              const cmds = commands.map((command) => {
                let file = require(`../../commands/${dir}/${command}`);

                if (!file.name) return "No command name.";

                let name = file.name.replace(".js", "");

                let des = client.commands.get(name).description;

                let obj = {
                  cname: `\`${name}\``,
                  des,
                };

                return obj;
              });

              let dota = new Object();

              cmds.map((co) => {
                dota = {
                  name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                  value: co.des ? co.des : "No Description",
                  inline: true,
                };
                catts.push(dota);
              });

              cots.push(dir.toLowerCase());
            });

            const command =
              client.commands.get(args[0].toLowerCase()) ||
              client.commands.find(
                (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
              );

            if (cots.includes(args[0].toLowerCase())) {
              const combed = new MessageEmbed()
                .setTitle(
                  `__${
                    args[0].charAt(0).toUpperCase() + args[0].slice(1)
                  } Commands!__`
                )
                .setDescription(
                  `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ban\`.\n\n`
                )
                .addFields(catts)
                .setColor(color);

              return message.channel.send({ embeds: [combed] });
            }

            if (!command) {
              const embed = new MessageEmbed()
                .setTitle(
                  `Invalid command! Use \`${prefix}help\` for all of my commands!`
                )
                .setColor("RED");
              return message.channel.send({ embeds: [embed] });
            }

            const embed = new MessageEmbed()
              .setTitle("Command Details:")
              .addField(
                "Command:",
                command.name ? `\`${command.name}\`` : "No name for this command."
              )
              .addField(
                "Aliases:",
                command.aliases
                  ? `\`${command.aliases.join("` `")}\``
                  : "No aliases for this command."
              )
              .addField(
                "Usage:",
                command.usage
                  ? `\`${prefix}${command.name} ${command.usage}\``
                  : `\`${prefix}${command.name}\``
              )
              .addField(
                "Command Description:",
                command.description
                  ? command.description
                  : "No description for this command."
              )
              .addField(
                "Guild Premium:",
                command.guildPremium
                  ? `\`${command.guildPremium}\``
                  : "`false`"
              )
              .addField(
                "User Premium:",
                command.userPremium
                  ? `\`${command.userPremium}\``
                  : "`false`"
              )
              .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.displayAvatarURL({
                  dynamic: true,
                })
              )
              .setTimestamp()
              .setColor(color);
            return message.channel.send({ embeds: [embed] });
        }
    },
};