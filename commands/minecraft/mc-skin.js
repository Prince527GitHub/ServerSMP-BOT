const { MessageEmbed, Message, Client } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'mc-skin',
    category : 'minecraft',
    usage: '[ mc username ]',
    aliases : ['mcskin'],
    description : "Gets the skin of a Minecraft user.",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {

      const isValidNickname = string => NICKNAME_REGEX.test(string);
      const NICKNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;

      if (args.length !== 1) {
         return message.reply(
            'Error! Only usernames are accepted for this command.'
         );
      }

      const nickname = args[0];

      if (!isValidNickname(nickname)) {
         return message.reply(
            'The username is too long! Minecraft usernames can only be 16 characters.'
         );
      }

      let baseurl = `https://api.mojang.com/users/profiles/minecraft/`

      await axios.get(`${baseurl}${nickname}`).then(function (minecraftuser) {
         let uuid = minecraftuser.data.id

         message.channel.send(
            new MessageEmbed()
               .setTitle(`${nickname}'s Skin`)
               .addField(`${nickname}'s UUID`, uuid)
               .setImage(`https://www.mc-heads.net/body/${uuid.toString()}/right`)
         ).catch(err => {
            message.channel.send("An error occurred when executing this command. Invalid username?");
            console.error(err);
         })


      })
    }
  }
