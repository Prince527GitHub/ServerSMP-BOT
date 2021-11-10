const canvacord = require("canvacord");

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

module.exports = {
    name: "api-ratelimit/rank",

    run: async (req, res) => {

        const username = req.query.username;
        if (!username) return res.status(500).json({
            "ERROR": "Need username"
        });

        const discriminator = req.query.discriminator;
        if (!discriminator) return res.status(500).json({
            "ERROR": "Need discriminator"
        });
        if (discriminator.length > 4) return res.status(500).json({
            "ERROR": "Discriminator can't be more then 4 numbers"
        })

        const avatar = req.query.avatar;
        if (!avatar) return res.status(500).json({
            "ERROR": "Need avatar"
        });

        if (!isValidHttpUrl(avatar)) return res.status(500).json({
            "ERROR": "Not a url"
        });

        const cxp = req.query.cxp;
        if (!cxp) return res.status(500).json({
            "ERROR": "Need cxp"
        });

        const newCxp = parseInt(Number(cxp));

        const rxp = req.query.rxp;
        if (!rxp) return res.status(500).json({
            "ERROR": "Need rxp"
        });

        const newRxp = parseInt(Number(rxp));

        const level = req.query.level;
        if (!level) return res.status(500).json({
            "ERROR": "Need level"
        });

        const newLevel = parseInt(Number(level));

        const rank = req.query.rank;
        if (!rank) return res.status(500).json({
            "ERROR": "Need rank"
        });

        const newRank = parseInt(Number(rank));

        const status = req.query.status;
        if (!status) return res.status(500).json({
            "ERROR": "Need status"
        });

        const newStatus = status.toLowerCase()
        if (!["online", "idle", "dnd", "offline", "streaming"].includes(newStatus)) return res.status(500).json({
            "ERROR": "Status must be online, idle, dnd, offline or streaming"
        });

        let pbcolor;
        if (req.query.pbcolor) {
            if (!isHexColor(req.query.pbcolor)) return res.status(500).json({
                "ERROR": "Not a valid hex color"
            });
            pbcolor = req.query.pbcolor;
        } else {
            pbcolor = "FFFFFF";
        }

        const rankbuild = new canvacord.Rank()
            .setAvatar(avatar)
            .setCurrentXP(Number(newCxp))
            .setRequiredXP(Number(newRxp))
            .setRank(Number(newRank))
            .setLevel(Number(newLevel))
            .setStatus(newStatus)
            .setProgressBar(`#${pbcolor}`)
            .renderEmojis(true)
            .setUsername(username)
            .setDiscriminator(discriminator);

        rankbuild.build().then(data => {
            res.set({
                'Content-Type': 'image/png'
            });
            res.status(200).send(data);
        });

    }
}