const client = require('../index');
const textList = require("../assets/textSystem.json");
const textSchemaGuild = require("../models/textSystem-guild");
const textSchemaUser = require("../models/textSystem-user");

client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;

    // Set Message
    const msg = message.content;
    if (!msg) return;

    // Check DB
    textSchemaGuild.findOne({
        Guild: message.guild.id
    }, async (err, data) => {
      if(!data) return;
      textSchemaUser.findOne({
          User: message.author.id
        }, async (err, data) => {
          if (!data) {
              new textSchemaUser({
                  User: message.author.id,
                  Score: "0"
                }).save();
              }
              if (data) {
                // Check message
                if (textList.bad.includes(msg.toLowerCase())) {
                  data.Score = `${Number(data.Score) - 2}`;
                  data.save();
                  return message.reply({ content: "Removed 2 rep points.", allowedMentions: {  repliedUser: false } });

                } else if (textList.good.includes(msg.toLowerCase())) {
                  data.Score = `${Number(data.Score) + 1}`;
                  data.save();
                  return message.reply({ content: "Added 1 rep point.", allowedMentions: { repliedUser: false } });

                }

              }
            });
          });

});
