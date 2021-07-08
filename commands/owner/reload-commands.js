const { MessageEmbed, Message, Client } = require('discord.js');
const glob = require("glob");

module.exports = {
    name: 'reload-commands',
    category : 'owner',
    usage: '',
    aliases : ['r-c'],
    description : "I reload the command if there is an update!",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if(message.author.id !== process.env.OWNER) return message.reply("This command can only be used by the owner!");
      client.commands.sweep(() => true)
      glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
        if(err) return console.log(err);
        filePaths.forEach((file) => {
          delete require.cache[require.resolve(file)];
          const pull = require(file);
          if(pull.name) {
            console.log(`Reloaded ${pull.name} (cmd)`)
            client.commands.set(pull.name, pull)
          }
          if(pull.aliases && Array.isArray(pull.aliases)) {
            pull.aliases.forEach((alias) => {
              client.aliases.set(alias, pull.name)
            })
          }
        })
      })
      message.channel.send("Reloaded commands!");
    }
  }
