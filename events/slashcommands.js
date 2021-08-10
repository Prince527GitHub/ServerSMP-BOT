const client = require('../index');
const { MessageEmbed, APIMessage } = require('discord.js');
const ascii = require('ascii-table')
let table = new ascii("Slash commands");
table.setHeading('Command', ' Load status');

client.on('ready', async () => {
  // Slash commands

    // console log commands

    table.addRow('duck','✅')
    table.addRow('ping','✅')
    table.addRow('echo','✅') // Hi there Prince527 here I suck at code.
    table.addRow('info','✅')
    table.addRow('help','✅')

    console.log(table.toString());

  //const commands = await client.api.applications(client.user.id).commands.get()
  //console.log(commands)

  //client.api.applications(client.user.id).guilds('697984979568820344').commands('870780529774039070').delete()
  //client.api.applications(client.user.id).guilds('697984979568820344').commands('870501571971125258').delete()
  //client.api.applications(client.user.id).guilds('697984979568820344').commands('870503412213616660').delete()
  //client.api.applications(client.user.id).guilds('697984979568820344').commands('870712600588058725').delete()

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "duck",
      description: "A random image of a duck."
    }
  });

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "ping",
      description: "Shows the bot's ping."
    }
  });

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "echo",
      description: "Echos your text as an embed!",
      options: [
        {
          name: "content",
          description: "Content of the embed",
          type: 3,
          required: true,
        }
      ]
    }
  });

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "info",
      description: "Give's some info on the bot."
    }
  });

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "help",
      description: "The command list."
    }
  });

  client.ws.on('INTERACTION_CREATE', async interaction => {
    const commnad = interaction.data.name;
    const args = interaction.data.options;

    if(commnad == 'duck') {
      const embed = new MessageEmbed()
        .setTitle("Random duck")
        .setColor("RANDOM")
        .setDescription("A random duck from `https://random-d.uk/`.")
        .setImage(String('https://random-d.uk/api/v2/randomimg?t=' + new Date().getTime().toString()))
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed)
        }
      })
    }

    if(commnad == 'ping') {
      const embed = new MessageEmbed()
        .setTitle("Pong!")
        .setDescription(`WebSocket ping is ${client.ws.ping}MS`)
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed)
        }
      })
    }

    if(commnad == "echo") {
      const description = args.find(arg => arg.name.toLowerCase() == "content").value;
      const embed = new MessageEmbed()
        .setTitle("Echo!")
        .setDescription(description)
        .setAuthor(interaction.member.user.username)
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed)
        }
      })
    }

    if(commnad == 'info') {
      const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Info")
          .setThumbnail("https://serversmp.arpismp.ml/assets/serversmp-bot.png")
          .addField("Ping:", `\`${client.ws.ping}ms\``)
          .addField("Servers:", `\`${client.guilds.cache.size}\``)
          .setDescription(`[Invite](https://discord.com/oauth2/authorize?client_id=778409873573412874&permissions=261992476534&redirect_uri=https%3A%2F%2Fdiscord.com%2Fchannels%2F%40me&scope=bot%20applications.commands)\n[Website](https://serversmp.arpismp.ml/)\n[Support](https://youtu.be/dQw4w9WgXcQ)`)
          .setImage("https://serversmp.arpismp.ml/qrcode.png")
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed)
        }
      })
    }

    if(commnad == 'help') {
      const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("Help")
          .setDescription('Do `-help` or go to the [website](https://serversmp.arpismp.ml/commands.html)!')
          .setThumbnail("https://serversmp.arpismp.ml/assets/serversmp-bot.png")
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, embed)
        }
      })
    }

  });
});

async function createAPIMessage(interaction, content) {
  const apiMessage = await APIMessage.create(client.channels.resolve(interaction.channel_id), content).resolveData().resolveFiles();
  return { ...apiMessage.data, files: apiMessage.files };
}
