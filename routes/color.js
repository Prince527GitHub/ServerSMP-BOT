const config = require("../config.json");
const { Color } = require("coloras");

function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}

module.exports = {
    name: "api-ratelimit/color",
    run: async (req, res) => {
        const color = req.query.color;
        if (!color) {
          const random = new Color();
          return res.status(200).json({
            hex: `${random.toHex()}`,
            rgb: `${random.toRgb()}`,
            hsl: `${random.toHsl()}`,
            hsv: `${random.toHsv()}`,
            cmyk: `${random.toCmyk()}`,
            image: `${config.URL}/api-ratelimit/color/image?color=${random.toHex().slice(1)}`
          });
        }

        if (!isHexColor(color)) return res.status(500).json({
            "ERROR": "Not a valid hex color"
        });

        const selectedColor = new Color(`#${color}`);

        res.status(200).json({
          hex: `#${color}`,
          rgb: `${selectedColor.toRgb()}`,
          hsl: `${selectedColor.toHsl()}`,
          hsv: `${selectedColor.toHsv()}`,
          cmyk: `${selectedColor.toCmyk()}`,
          image: `${config.URL}/api-ratelimit/color/image?color=${color}`
        });
    }
}