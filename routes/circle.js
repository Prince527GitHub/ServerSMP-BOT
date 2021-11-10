const { createCanvas, loadImage } = require('canvas');

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
    name: "api-ratelimit/circle",

    run: async (req, res) => {
        const url = req.query.url;
        if (!url) return res.status(500).json({
            "ERROR": "No data"
        });
        if (!isValidHttpUrl(url)) return res.status(500).json({
            "ERROR": "Not a url"
        });

        const canvas = createCanvas(512, 512)
        const ctx = canvas.getContext('2d')

        await ctx.beginPath();
        await ctx.arc(256, 256, 256, 0, Math.PI * 2, true);
        await ctx.closePath();
        await ctx.clip();

        try {
            const urlImage = await loadImage(await url)
            await ctx.drawImage(urlImage, 0, 0, 512, 512);

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