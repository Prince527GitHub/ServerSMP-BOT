const { createCanvas, loadImage } = require('canvas');

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

module.exports = {
    name: "api-ratelimit/color/image",
    run: async (req, res) => {
        const color = req.query.color;
        if (!color) return res.status(500).json({
            "ERROR": "No data"
        });

        if (!isHexColor(color)) return res.status(500).json({
            "ERROR": "Not a valid hex color"
        });

        const canvas = createCanvas(128, 128);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = `#${color}`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        res.set({
            'Content-Type': 'image/png'
        });
        res.status(200).send(canvas.toBuffer());
    }
}