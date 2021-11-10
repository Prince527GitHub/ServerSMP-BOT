const {
    createCanvas,
    loadImage
} = require('canvas');

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

module.exports = {
    name: "api-ratelimit/upscale",

    run: async (req, res) => {
        const url = req.query.url;
        if (!url) return res.status(500).json({
            "ERROR": "No data"
        });
        if (!isValidHttpUrl(url)) return res.status(500).json({
            "ERROR": "Not a url"
        });

        const size = req.query.size;
        if (!size) return res.status(500).json({
            "ERROR": "No data"
        });

        if (!Number(size)) return res.status(500).json({
            "ERROR": "Size must be a number"
        });

        const parsedSize = Math.round(size)

        if (parsedSize > 512) return res.status(500).json({
            "ERROR": "Size cant be higher then 512"
        });

        if (parsedSize < 1) return res.status(500).json({
            "ERROR": "Size cant be smaller then 1"
        });

        const canvas = createCanvas(parsedSize, parsedSize)
        const ctx = canvas.getContext('2d')

        try {
            const urlImage = await loadImage(await url)
            await ctx.drawImage(urlImage, 0, 0, parsedSize, parsedSize);

            await res.set({
                'Content-Type': 'image/png'
            });
            res.status(200).send(canvas.toBuffer());
        } catch (e) {
            res.status(500).json({
                "ERROR": "Unsupported image type"
            });
        }
    }
}