const { MessageEmbed, Message, Client } = require('discord.js');
const moment = require('moment');
const hypixeljs = require('hypixeljs');
const hypixel = require('hypixeljs');
if (process.env.HYPIXELAPI_KEY !== "false") {
  hypixel.login(process.env.HYPIXELAPI_KEY);
}

module.exports = {
    name: 'hypixel',
    category : 'minecraft',
    usage: '[ mc username ]',
    aliases : ['hypixelpl'],
    description : "Gets stats on a hypixel player!",
    userPremium: true,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if (process.env.HYPIXELAPI_KEY === "false") {
        return message.reply('This command is disabled on this bot!');
      }
      // heres some fancy constants for other constants to depend on
      const NICKNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;
      const FULL_UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      const SIMPLIFIED_UUID_REGEX = /^[0-9a-f]{32}$/;


      // isOnline
      const isOnline = (lastLogin, lastLogout) =>
         lastLogin > lastLogout ? 'Online' : 'Offline';

      // getRank
      const getRank = json => {
         let fullRank;
         let baseRank = 'Default';
         let permRank;
         let displayRank;
         if (json.packageRank) baseRank = replaceRank(json.packageRank);
         if (json.newPackageRank) baseRank = replaceRank(json.newPackageRank);
         if (json.monthlyPackageRank == 'SUPERSTAR') baseRank = 'MVP++';
         if (json.rank && json.rank != 'NORMAL') {
            permRank = json.rank.replace('MODERATOR', 'MOD');
         }
         if (json.prefix) displayRank = json.prefix.replace(/§.|\[|]/g, '');

         function replaceRank(toReplace) {
            return toReplace
               .replace('VIP_PLUS', 'VIP+')
               .replace('MVP_PLUS', 'MVP+')
               .replace('NONE', 'Default');
         }

         fullRank = `**[${baseRank}]**`;
         if (permRank) fullRank = `**[${permRank}]** *(actually ${baseRank})*`;
         if (displayRank) {
            fullRank = `**[${displayRank}]** *(${permRank ? `[${permRank}] ` : ''
               }actually ${baseRank})*`;
         }
         return fullRank;
      };

      // networkLevel
      const networkLevel = networkExp => {
         const REVERSE_PQ_PREFIX = -3.5;
         const REVERSE_CONST = 12.25;
         const GROWTH_DIVIDES_2 = 0.0008;
         return networkExp < 0
            ? 1
            : Math.floor(
               1 +
               REVERSE_PQ_PREFIX +
               Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * networkExp)
            );
      };

      // numberWithCommas
      const numberWithCommas = number =>
         number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      // formatAPITime
      const formatAPITime = timestamp =>
         moment(timestamp).format('dddd, MMMM, Do YYYY, h:mm:ss a');

      // isValidNickname
      const isValidNickname = string => NICKNAME_REGEX.test(string);

      // isValidUuid
      const isValidUuid = string =>
         string.match(FULL_UUID_REGEX) || string.match(SIMPLIFIED_UUID_REGEX);



      if (args.length > 1 || !isValidNickname(args[0])) {
         message.channel.send('Please only provide a username after the command (:');
         return;
      }

      if (args.length == 0) {
         message.channel.send("Not enough arguments! Please provide a username.");
         return;
      }

      if (!isValidNickname(args) && !isValidUuid(args)) {
         return message.reply(
            `The player name provided was not valid as it was more than 16 characters/not in UUID format.`
         );
      }

      function getPlayerEmbed(player) {
         return new MessageEmbed()
            .setTitle(
               `${player.displayname} **(Currently ${isOnline(player.lastLogin, player.lastLogout
               )})**`
            )
            .setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
            .setImage(`https://hypixel.paniek.de/signature/${player.uuid}/bedwars`)
            .setColor('#E0BBE4')
            .setFooter('Image Bedwars Stats by Paniek')
            .addField('Rank:', getRank(player), true)
            .addField('Level:', networkLevel(player.networkExp), true)
            .addField('Karma:', player.karma ? numberWithCommas(player.karma) : 0, true)
            .addField(
               'Achievement Points:',
               player.achievementPoints ? numberWithCommas(player.achievementPoints) : 0,
               true
            )
            .addField(
               'Joined:',
               player.firstLogin ? formatAPITime(player.firstLogin) : 'Hasn\'t Joined!',
               true
            )
            .addField(
               'Last Login:',
               player.lastLogin ? formatAPITime(player.lastLogin) : 'Hasn\'t Joined!',
               true
            );
      }

      const input = args[0];

      if (!isValidNickname(input) && !isValidUuid(input)) {
         return message.reply(
            `The player name provided was not valid as it was more than 16 characters/not in UUID format.`
         );
      }

      const promise = isValidNickname(input)
         ? hypixeljs.getPlayer.byName(input)
         : hypixeljs.getPlayer.byUuid(input);

      promise
         .then(json => message.channel.send(getPlayerEmbed(json)))
         .catch(console.error)

    }
  }
