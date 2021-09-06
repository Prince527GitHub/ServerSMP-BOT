const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: 'eval',
    usage: '[ code ]',
    description : "Evaluate a given code!",
    botPermission: ["EMBED_LINKS"],
    owner: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        try {
            const code = args.join(" ");
            if (!code) {
              return message.channel.send("What do you want to evaluate?");
            }
            let evaled = eval(code);
      
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      
            let embed = new MessageEmbed()
              .setAuthor("Eval", message.author.avatarURL())
              .addField("Input", `\`\`\`${code}\`\`\``)
              .addField("Output", `\`\`\`${evaled}\`\`\``)
              .setColor("BLUE");
      
            message.channel.send({ embeds: [embed] });
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
          }
    }
}