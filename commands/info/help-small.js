const {
  MessageEmbed
} = require("discord.js");
const {
  readdirSync
} = require("fs");
const prefix = process.env.PREFIX;

module.exports = {
  name: "help-small",
  aliases: ['hs'],
  description: "Shows all available bot commands in a small slider.",
  run: async (client, message, args) => {
    if (message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
    const p = await client.prefix(message)
    const colr = '#2F3136';
    if (!args[0]) {
      let cats = [];
      let ignored = ["owner"];
      readdirSync('./commands/').forEach(dir => {
        let data = new Object();
        if (ignored.includes(dir.toLowerCase())) return;
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        const cmds = commands.map(file => {
          let name;
          if (!file) return "No command name.";
          name = file.replace(".js", "");
          return name;
        })
        data = {
          title: `__${dir.charAt(0).toUpperCase() + dir.slice(1)}__`,
          name: cmds.join(", ")
        }
        let embe = new MessageEmbed()
          .setTitle(data.title).setColor(client.color)
          .setDescription(data.name)
        cats.push(embe)
      })
      let emoji = ['⬅', '➡']
      message.channel.createSlider(message.author.id, cats, emoji)
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Command not found! Use \`${p}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }
      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "Command Name:",
          command.name ? `\`${command.name}\`` : `Nope`
        )
        .addField(
          "Alaises:",
          command.aliases ?
          `\`${command.aliases.join("` `")}\`` :
          `No aliases`
        )
        .addField(
          "Usage:",
          command.usage ?
          `\`${p}${command.name} ${command.usage}\`` :
          `\`${p}${command.name}\``
        )
        .addField(
          "Description:",
          command.description ?
          command.description :
          `No Description`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true
          })
        )
        .setTimestamp()
        .setColor(colr);
      return message.channel.send(embed);
    }
  },
};
