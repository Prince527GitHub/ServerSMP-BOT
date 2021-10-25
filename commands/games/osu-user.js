const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const osuApi = require("../../assets/js/osu.js");

module.exports = {
    name: 'osu-user',
    usage: '[ username ]',
    description : "Get's info on a osu user! (not the best command.)",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if(process.env.OSU_API === "false") return message.reply("OSU command is off.");
      if(!args[0]) return message.reply("Please specify a osu user!")
      osuApi.apiCall('/get_user', { u: args[0] }).then(async(user) => {

        const canvas = createCanvas(960, 160)
        const ctx = canvas.getContext('2d')

        // Avatar
        const userdisplay = await loadImage(`https://a.ppy.sh/${user[0].user_id}`)
        ctx.drawImage(userdisplay, 15, 15, 128, 128)

        // Background
        const background = await loadImage('./assets/image/osu.png')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        // Username and rank
        ctx.font = 'italic 15px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.fillText(`${user[0].username} #${user[0].pp_rank}`, 155, 30)

        // Country and rank
        ctx.font = 'italic 15px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.fillText(`${user[0].country} #${user[0].pp_country_rank}`, 155, 55)

        // pp
        ctx.font = 'italic 15px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";
        ctx.fillText(`${Math.round(user[0].pp_raw)}pp`, 633, 30)

        // Accuracy
        ctx.font = 'italic 13px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";
        ctx.fillText(`${Math.round(user[0].accuracy)}% acc`, 628, 55)

        // Rank ssh
        ctx.font = '13px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(`${user[0].count_rank_ssh}`, 685, 60)

        // Rank ss
        ctx.font = '13px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(`${user[0].count_rank_ss}`, 730, 60)

        // Rank sh
        ctx.font = '13px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(`${user[0].count_rank_sh}`, 772, 60)

        // Rank s
        ctx.font = '13px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(`${user[0].count_rank_s}`, 815, 60)

        // Rank a
        ctx.font = '13px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(`${user[0].count_rank_a}`, 860, 60)

        // Level
        ctx.font = '15px Arial'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(`${Math.round(user[0].level)}`, 907, 49)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'osu.png');
        message.channel.send({ files: [attachment] })
      }).catch(err => message.reply("User does not exist!"))
    }
  }
