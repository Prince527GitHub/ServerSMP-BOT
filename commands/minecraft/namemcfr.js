const { MessageEmbed, Message, Client } = require('discord.js');
const axios = require("axios");

module.exports = {
    name: 'namemcfr',
    category : 'minecraft',
    usage: '[ mc username ]',
    aliases : ['nmcfr'],
    description : "Gets the friend list of a NameMC user.",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {

            const isValidNickname = string => NICKNAME_REGEX.test(string);
            const NICKNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;

            if (args.length == 0) {
               message.channel.send("Not enough arguments! Please provide a username.");
               return;
            }

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

            // Gets the user's ID directly from API, not through mojangJS as it can be buggy.
            let baseurl = `https://api.mojang.com/users/profiles/minecraft/`

            await axios.get(`${baseurl}${nickname}`).then(function (minecraftuser) {
               let uuid = minecraftuser.data.id

               const { JSDOM } = require("jsdom");
               const { window } = new JSDOM("");
               const $ = require("jquery")(window);
               $.getJSON(`https://api.namemc.com/profile/${uuid}/friends`, function (data) {
                  let returnembed = new MessageEmbed()
                     .setTitle(`${nickname}'s NameMC Friends`)
                     .setThumbnail('https://visage.surgeplay.com/face/' + uuid)
                     .setColor('#c5aaa8');

                  if (data.length === 0) {
                     returnembed.addField(`Friends`, `${nickname} has no NameMC friends or does not have a profile.`)
                  } else if (data.length >= 1) {
                     for (
                        let i = 0;
                        i < (data.length <= 24 ? data.length : 24);
                        i++
                     ) {
                        returnembed.addField((`${data[i].name}`),
                           data[i].uuid
                        );
                     }

                     if (data.length > 24) {
                        returnembed.addField(
                           `${args[0]} has too many friends therefore I cannot them all, but I displayed the first few.`,
                           `**${args[0]}** has a total of ${data.length} friends on NameMC.`
                        )
                     };
                  }
                  message.channel.send(returnembed).catch(err => console.error(err));

               }).catch(err => console.error(err));

            });

    }
  }
