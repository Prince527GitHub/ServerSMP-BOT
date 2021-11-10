const { createCanvas, loadImage } = require('canvas');

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

module.exports = {
    name: "api-ratelimit/image-text",
    run: async (req, res) => {

        // Get text
        const text = req.query.text;
        if (!text) return res.status(500).json({
            "ERROR": "No data"
        });

        // Creating
        const canvas = createCanvas(1024, 1024);
        const ctx = canvas.getContext('2d');

        //Font size change
        fitTextOnCanvas(text, "arial", 512);

        function fitTextOnCanvas(text, fontface, yPosition) {

            // start with a large font size
            var fontsize = 300;

            // lower the font size until the text fits the canvas
            do {
                fontsize--;
                ctx.font = fontsize + "px " + fontface;
            } while (ctx.measureText(text).width > canvas.width)

            // draw the text
            ctx.beginPath();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, 512, yPosition);
            ctx.closePath();
        }

        // Color
        let color;
        if (req.query.color) {
            if (!isHexColor(req.query.color)) return res.status(500).json({
                "ERROR": "Not a valid hex color"
            });
            color = req.query.color;

            ctx.globalCompositeOperation = 'destination-over'
            ctx.fillStyle = `#${color}`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Sending
        res.set({
            'Content-Type': 'image/png'
        });
        res.status(200).send(canvas.toBuffer());
    }
}