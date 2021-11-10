const Canvas = require("canvas")

module.exports = {
	name: "api-ratelimit/communism",

	run: async(req, res) => {
	  const { image } = req.query;
	  if (!image) return res.json({ error: "Please provide an image!" })
	  try {
		  const overlayAvatarURL = "https://miro.medium.com/max/1024/1*L_uBUcOn1-NvGPQFZ4XlrQ.png"
		  const baseAvatar = await Canvas.loadImage(image);
		  const overlayAvatar = await Canvas.loadImage(overlayAvatarURL);
		  const canvas = Canvas.createCanvas(1024, 1024);
		  const ctx = canvas.getContext('2d');
		  ctx.globalAlpha = 0.3;
		  ctx.drawImage(baseAvatar, 0, 0, canvas.width, canvas.height);
		  ctx.drawImage(overlayAvatar, 0, 0, 1024, 1024);
		  res.set({ "Content-Type": "image/png" })
		  res.send(canvas.toBuffer())
	  } catch (error) {
		  res.json({ error: "Invalid image!" })
	  }
	}
}