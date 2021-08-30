const { afk } = require('../collection/index');
const client = require('../index');
const moment = require('moment');

client.on('messageCreate', async(message) => {
  if(!message.guild || message.author.bot) return;
  const mentionMember = message.mentions.members.first();
  if(mentionMember) {
      const data = afk.get(mentionMember.id);
      if(data) {
          const [ timestamp, reason ] = data;
          const timeAgo = moment(timestamp).fromNow();
          message.reply(`${mentionMember} is currenly afk (${timeAgo})\nReason: ${reason}`)
      }
  }
  const getData = afk.get(message.author.id);
  if(getData) {
      afk.delete(message.author.id);
      message.reply('afk has been removed!')
  }
})