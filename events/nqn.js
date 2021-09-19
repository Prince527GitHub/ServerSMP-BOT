const client = require("../index");
const fetch = require('node-fetch');

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    if(await client.mongo_quick.has(`nqn-${message.guild.id}`) === false) return;
    let msg = message.content;

    //if(msg.startsWith("<") && msg.endsWith(">")) return;

    let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
    if (!emojis) return;
    emojis.forEach(m => {
        let emoji = client.emojis.cache.find(x => x.name === m)
        if (!emoji) return;
        let temp = emoji.toString()
        if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
        else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
    });

    if (msg === message.content) return;

    let webhook = await message.channel.fetchWebhooks();
    webhook = webhook.find(x => x.name === `${client.user.username}-NQN`);

    if (!webhook) {
      webhook = await message.channel.createWebhook(`${client.user.username}-NQN`, {
        avatar: client.user.displayAvatarURL({ dynamic: true })
      }).catch(err => {
        console.log(err);
      });
    };

    await message.delete().catch(err => { });
    webhook.send({
	    content: msg,
	    username: message.member.nickname ? message.member.nickname : message.author.username,
	    avatarURL: message.author.displayAvatarURL(),
    }).catch(err => {
      console.log(err);
    });

});
