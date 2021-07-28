const { MessageEmbed, Message, Client } = require('discord.js');
const moment = require('moment');
const mojangjs = require('mojangjs');

module.exports = {
    name: 'namemc',
    category : 'minecraft',
    usage: '[ mc username ]',
    description : "Gets name history of a Minecraft user from the Mojang API.",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {

            const isValidNickname = string => NICKNAME_REGEX.test(string);
            const NICKNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;

            function joinNames(playerNameHistory) {
               let allNames = '';
               for (let i = 0; i < playerNameHistory.length; i++) {
                  if (i + 1 !== playerNameHistory.length) {
                     allNames += playerNameHistory[i].name + ', ';
                  } else {
                     allNames += playerNameHistory[i].name;
                  }
               }
               return allNames;
            }

            if (args.length > 1 || !isValidNickname(args[0])) {
               message.channel.send('Please only provide a valid username after the command.');
               return;
            }

            if (args.length == 0) {
               message.channel.send("Not enough arguments! Please provide a username.");
               return;
            }

            // MojangJS NPM package is used.
            mojangjs
               .getUUID(args[0])
               .then(uuid => {
                  mojangjs.nameHistory
                     .byUUID(uuid)
                     .then(namehistory => {
                        const playerHistory = new MessageEmbed()
                           .setTitle(`**${args[0]}'s** Name History`)
                           .setThumbnail('https://visage.surgeplay.com/face/' + uuid)
                           .setURL(`https://namemc.com/${args[0]}`)
                           .setColor('#dee8eb');

                        playerHistory.addField(
                           `${args[0]} has had ${namehistory.length} name change/s.`,
                           `**${args[0]}'s** name history includes: ${joinNames(namehistory)}`
                        );

                        return message.channel.send(playerHistory);
                     })
                     .catch(console.error);
               })
               .catch(err => {
                  message.channel.send("An error occurred when executing this command. Invalid username?");
                  console.error(err);
               });

    }
  }
