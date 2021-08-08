const client = require('../index.js');

client.on('message', async(message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes("@here") || message.content.includes("@everyone")) return;
  if (message.content.length > 22) return;
  if (message.mentions.has(client.user.id)) {
      message.channel.send(`**${client.user.username}**'s prefix is ${await client.prefix(message)}`);
  };
});
