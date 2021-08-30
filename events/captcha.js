const Client = require('../index');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('quick.db');
const { CaptchaGenerator } = require('captcha-canvas');

Client.on('guildMemberAdd', async (member) => {
    if(member.bot) return;
    try {
      if(db.has(`captcha-${member.guild.id}`)=== false) return;
          const options = {height: 200, width: 600};
          const captcha = new CaptchaGenerator(options);
          const buffer = await captcha.generate();
          const attachment = new MessageAttachment(buffer, "captcha.png");
          const msg = await member.send({ embeds: [
              new MessageEmbed()
                  .setTitle('Please enter the captcha')
                  .setImage('attachment://captcha.png')
                  .setColor("RANDOM")
          ], files: [attachment]})
          const filter = m => m.author.id == member.id;
          msg.channel.awaitMessages({ filter, max: 1, time: 10000 })
        .then(collected => {
                  if (collected.first().content == captcha.text) {
                      return msg.channel.send("Congrats, you have answered the captcha.");
                  } else {
                      msg.channel.send("You have answered the captcha incorrectly!")
                      msg.channel.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly.`)
                      member.kick()
                  }
        })
        .catch(collected => {
                  msg.channel.send(`You have been kicked from **${member.guild.name}** for not answering the captcha correctly.`)
                  member.kick()
        });
    } catch(e) {
      return;
    }
});
