const { createCanvas, loadImage } = require('canvas');
const osu = require('node-osu');

const osuApi = new osu.Api(process.env.OSU_API, {
    notFoundAsError: true,
    completeScores: false,
    parseNumeric: false
});

module.exports = {
    name: "api-ratelimit/osu",

    run: async (req, res) => {
    const userOSU = req.query.user;
    if (!userOSU) return res.status(500).json({
        "ERROR": "No data"
    });

    await osuApi.apiCall('/get_user', {
        u: userOSU
    }).then(async (user) => {

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

        await res.set({
            'Content-Type': 'image/png'
        });
        await res.status(200).send(await canvas.toBuffer())
    }).catch(err => {
        res.status(500).json({
            "ERROR": "An error happend (User not found)."
        })
    });
    }
}