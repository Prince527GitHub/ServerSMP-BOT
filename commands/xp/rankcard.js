const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const userRankcard = require('../../models/user-rankcard');
const { isColor } = require("coloras");

module.exports = {
    name: 'rankcard',
    description : "Options for user rankcards.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.reply("You need a color!");
        if(!args[1]) return message.reply("You need a style (true or false)!");
        if(!args[2]) return message.reply("You need a status (dnd, idle, offline, online, streaming)!");

        const isHexColor = color => /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);
        if(!isColor(args[0]).color) return message.reply("Not a valid color");
        if(isHexColor(args[0]) === false) return message.reply("Not a valid hex color");
        const color = args[0]

        let style;
        if(args[1] === "true") {
            style = args[1].toString();
        } else if(args[1] === "false") {
            style = args[1].toString();
        } else return message.reply("Status style are `true`, `false`.");

        let type;
        if(args[2] === "false") {
            type = args[2];
        } else if(args[2] === "dnd") {
            type = args[2];
        } else if(args[2] === "idle") {
            type = args[2];
        } else if(args[2] === "offline") {
            type = args[2];
        } else if(args[2] === "online") {
            type = args[2];
        } else if(args[2] === "streaming") {
            type = args[2];
        } else return message.reply("Status type are `dnd`, `idle`, `offline`, `online`, `streaming` or `false`.");

        if(process.env.RANKIMAG) {
            const image = args[3];
            if(image) {
                if(image.startsWith("http") && image.endsWith(".png")) {
                    await client.db_json.set(`rank-card-${message.author.id}`, image);
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId("rank-card-yes")
                                .setLabel("Accept")
                                .setStyle("SUCCESS"),
                            new MessageButton()
                                .setCustomId("rank-card-deny")
                                .setLabel("Deny")
                                .setStyle("DANGER")
                        )
                    const embed = new MessageEmbed()
                        .setTitle(`${message.member.user.username}'s RankCard Image`)
                        .setDescription("Just click one of the buttons to accept or deny the user's rankcard image.")
                        .addField("ImageURL", await client.db_json.get(`rank-card-${message.author.id}`))
                        .addField("UserID", message.author.id)
                        .setColor("RANDOM")
                    client.channels.cache.get(process.env.RANKIMAG).send({ embeds: [embed], components: [row] }).then(async(msg) => {
                        await client.db_json.set(`rankcard-${msg.id}`, message.author.id)
                    });
                } else return message.reply("If you want a image it has to start with `http` and end with `.png`");
            }
        }

        userRankcard.findOne({ User: message.author.id }, async(err, data) => {
            if(!data) {
                new userRankcard({
                    User: message.author.id,
                    ProgressBar: color,
                    StatusStyle: style,
                    StatusType: type,
                    Background: "default",
                }).save();
            } else {
                data.ProgressBar = color
                data.StatusStyle = style
                data.StatusType = type
                data.Background = "default"
                data.save();
            }
        })

        return message.reply("Data Saved!");
    }
}
