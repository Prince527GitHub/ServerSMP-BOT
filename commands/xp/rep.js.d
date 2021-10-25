const {
    Message,
    Client,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const repGuildSchema = require("../../models/textSystem-guild");
const repUserSchema = require("../../models/textSystem-user");
const {
    createCanvas,
    loadImage
} = require('canvas');

module.exports = {
    name: "rep",
    description: "Show you're rep card.",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        repGuildSchema.findOne({
            Guild: message.guild.id
        }, (err, data) => {
            if (!data) return message.reply("This server does not have the experimental rep system enabled");
            if (data) {
                repUserSchema.findOne({
                    User: message.author.id
                }, (err2, c) => {
                    if (!data2) return message.reply("You don't have any rep");
                    if (data2) {
                        // Creating
                        const canvas = createCanvas(600, 300)
                        const ctx = canvas.getContext('2d')

                        // Background
                        const background = await loadImage('./assets/image/rep card.png')
                        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

                        let avatar;
                        let name;
                        try {
                            const user = client.users.cache.get();
                            name = user.username;
                            avatar = user.displayAvatarUrl({
                                dynamic: false,
                                type: 'png'
                            });
                        } catch (e) {
                            name = "??????";
                            avatar = client.user.displayAvatarUrl({
                                dynamic: false,
                                type: 'png'
                            });
                        }

                        // name
                        ctx.font = "27px Arial";
                        ctx.rotate(0);
                        ctx.fillStyle = "#ffffff";
                        ctx.textAlign = "center";
                        ctx.fillText(name, 175, 50);

                        let number;
                        try {
                            number = data.Score;
                        } catch (e) {
                            number = "???";
                        }

                        // Number
                        ctx.font = "50px Arial";
                        ctx.rotate(0);
                        ctx.fillStyle = "#ffffff";
                        ctx.textAlign = "center";
                        ctx.fillText(number, 470, 160);

                        // User picture
                        const userdisplay = await loadImage('./assets/serversmp-logo_new.png')
                        ctx.beginPath();
                        ctx.arc(172, 168, 111, 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(userdisplay, 61, 57, 222, 222)

                        message.channel.send({ files: [
                            new MessageAttachment(canvas.toBuffer(), "rep.png")
                        ]});
                    }
                });
            }
        });
    },
};
