const { createCanvas, loadImage } = require('canvas');
const { instagramUser } = require('popcat-wrapper');

module.exports = {
    name: "api-ratelimit/instagram",

    run: async (req, res) => {
  
  // Get username
  const query = req.query.user;
        
  if (!query) return res.status(500).json({ "ERROR": "No data" });

  // Get data
  const user = await instagramUser(query).catch((err) => res.status(500).json({ "ERROR": "User not found!" }));

  // Creating
  const canvas = createCanvas(664, 233)
  const ctx = canvas.getContext('2d')

  // User picture
  const userdisplay = await loadImage(user.profile_pic)
  ctx.drawImage(userdisplay, 32, 32, 150, 150)

  // Background
  const background = await loadImage('./assets/image/instagram.png')
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  // name
  ctx.font = "27px Arial";
  ctx.rotate(0);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(user.username, 215, 70);

  // bio
  ctx.font = "13px Arial";
  ctx.rotate(0);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(`Bio: ${user.biography.slice(0, 49)}`, 215, 110);

  ctx.font = "13px Arial";
  ctx.rotate(0);
   ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(user.biography.slice(49), 215, 125);

  // Followers
  ctx.font = "bold 13px Arial";
  ctx.rotate(0);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(`${user.followers} Followers`, 215, 165);

  // Following
  ctx.font = "bold 13px Arial";
  ctx.rotate(0);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(`${user.following} Following`, 350, 165);

  // Posts
  ctx.font = "bold 13px Arial";
  ctx.rotate(0);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.fillText(`${user.posts} Posts`, 490, 165);

  // Sending
  await res.set({ 'Content-Type': 'image/png' });
  await res.status(200).send(await canvas.toBuffer())

    }
}