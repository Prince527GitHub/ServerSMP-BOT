const { MessageEmbed, Message, Client, MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas')

module.exports = {
    name: 'osu-user',
    category : 'games',
    usage: '[ username ]',
    description : "Get's info on a osu user! (not the best command.)",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(client, message, args) => {
      if(!args[0]) return message.reply("Please specify a osu user!")
      client.osuApi.apiCall('/get_user', { u: args[0] }).then(async(user) => {

        const canvas = createCanvas(960, 160)
        const ctx = canvas.getContext('2d')
        const userdisplay = await loadImage(`https://a.ppy.sh/${user[0].user_id}`)
        ctx.drawImage(userdisplay, 15, 15, 128, 128)
        const background = await loadImage('https://prince527.reeee.ee/571rBMXMs.png')
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        ctx.font = 'italic 15px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${user[0].username} #${user[0].pp_rank}`, 155, 30)

        ctx.font = 'italic 15px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${user[0].country} #${user[0].pp_country_rank}`, 155, 55)

        ctx.font = 'italic 15px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${Math.round(user[0].pp_raw)}pp`, 575, 30)

        ctx.font = 'italic 13px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${Math.round(user[0].accuracy)}% acc`, 570, 55)

        ctx.font = '13px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${user[0].count_rank_ssh}`, 680, 60)

        ctx.font = '13px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${user[0].count_rank_ss}`, 725, 60)

        ctx.font = '13px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${user[0].count_rank_sh}`, 768, 60)

        ctx.font = '13px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${user[0].count_rank_s}`, 805, 60)

        ctx.font = '13px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${user[0].count_rank_a}`, 850, 60)

        ctx.font = '15px Impact'
        ctx.rotate(0)
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${Math.round(user[0].level)}`, 900, 50)

        const attachment = new MessageAttachment(canvas.toBuffer(), 'osu.png');
        message.channel.send(attachment)
      })
    }
  }
