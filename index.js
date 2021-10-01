const { createCanvas, loadImage } = require('canvas');
const fetch = require('node-fetch').default;
const config = require("./config.json");
const express = require("express");
const request = require('request');
const path = require('path')
const fs = require('fs');
const app = express();
require('dotenv').config();

// <=================> RateLimit <=================>

const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: "Too many request from this IP, please try again after 15 minutes"
});

// <=================> OSU <=================>

const osu = require('node-osu');

const osuApi = new osu.Api(process.env.OSU_API, {
  notFoundAsError: true,
  completeScores: false,
  parseNumeric: false
});

// <=================> MongoDB <=================>

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// <=================> Discord Client <=================>

const { Client } = require("discord.js");

const client = new Client({
  intents: 32767,
  partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION", "GUILD_INVITES"],
});

// <=================> Assests <=================>

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// <=================> Home <=================>

app.get("/", (req, res) => {
  res.status(200).render("index.ejs", { url : config.URL });
});

// <=================> Joke <=================>

app.get("/joke", (req, res) => {
  const jokeString = require("./assets/joke.js");
  const randomNumber = Math.floor(Math.random() * jokeString.length);
  res.status(200).send({ "joke": `${jokeString[randomNumber]}` });
});

// <=================> DuckDungeon <=================>

app.get("/duck-dungeon", apiLimiter, async(req, res) => {

  let DuckDungeon;
  await fetch ('https://raw.githubusercontent.com/Prince527GitHub/Duck-Dungeon/main/duckdungeon.json')
  .then (res => res.text())
  .then (body => DuckDungeon = JSON.parse(body))

  res.status(200).send(DuckDungeon)
});

// <=================> OSU <=================>

app.get("/osu", apiLimiter, async(req, res) => {
  const userOSU = req.query.user;
  if (!userOSU) return res.status(200).send({ "ERROR": "No data" });

  await osuApi.apiCall('/get_user', { u: userOSU }).then(async(user) => {

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

      await res.set({ 'Content-Type': 'image/png' });
      await res.status(200).send(await canvas.toBuffer())
  }).catch(err => {
    res.status(200).send({ "ERROR": "An error happend (User not found)." })
  });
});

// <=================> Circle <=================>

app.get("/circle", apiLimiter, async(req, res) => {
  const url = req.query.url;
  if (!url) return res.status(200).send({ "ERROR": "No data" });

  const canvas = createCanvas(1024, 1024)
  const ctx = canvas.getContext('2d')

	await ctx.beginPath();
	await ctx.arc(512, 512, 512, 0, Math.PI * 2, true);
	await ctx.closePath();
	await ctx.clip();

  try {
    const urlImage = await loadImage(await url)
		await ctx.drawImage(urlImage, 0, 0, 1024, 1024);
        
    await res.set({ 'Content-Type': 'image/png' });
    res.status(200).send(canvas.toBuffer());
  } catch (e) {
    res.status(200).send({ "ERROR": "Unsupported image type" });
  }
});

// <=================> Upscale <=================>

app.get("/upscale", apiLimiter, async(req, res) => {
  const url = req.query.url;
    if (!url) return res.status(200).send({ "ERROR": "No data" });

  const size = req.query.size;
    if (!size) return res.status(200).send({ "ERROR": "No data" });

  if(!Number(size)) return res.status(200).send({ "ERROR": "Size must be a number" }); 

  const parsedSize = Math.round(size)

  if(parsedSize > 512) return res.status(200).send({ "ERROR": "Size cant be higher then 512" });

  if(parsedSize < 1) return res.status(200).send({ "ERROR": "Size cant be smaller then 1" });

  const canvas = createCanvas(parsedSize, parsedSize)
  const ctx = canvas.getContext('2d')

  try {
    const urlImage = await loadImage(await url)
		await ctx.drawImage(urlImage, 0, 0, parsedSize, parsedSize);
        
    await res.set({ 'Content-Type': 'image/png' });
    res.status(200).send(canvas.toBuffer());
  } catch (e) {
    res.status(200).send({ "ERROR": "Unsupported image type" });
  }
});

client.on('ready', async() => {

  // <=================> Discord Logs <=================>

  console.log(`Discord ✔️`);

  // <=================> Avatar <=================>

  app.get("/avatar", apiLimiter, async(req, res) => {
    const user = req.query.user;
    if (!user) return res.status(200).send({ "ERROR": "No data" });

    const type = req.query.type;
    if (!type) return res.status(200).send({ "ERROR": "No type" });

    if(!["png","jpeg"].includes(type)) return res.status(200).send({ "ERROR": "Type has to be png or jpeg" });
    
    let userrecoce;
    try {
      userrecoce = await client.users.fetch(user);
    } catch (e) {
      res.status(200).send({ "ERROR": "User not found" });
      return;
    }

    let url;
    try {
      url = `https://cdn.discordapp.com/avatars/${await userrecoce.id}/${await userrecoce.avatar}.${type}?size=1024`
    } catch (e) {
      res.status(200).send({ "ERROR": "User not found" });
      return;
    }
    await res.set({ 'Content-Type': 'image/png' });

    await request({ url: url, encoding: null }, function(error, response, body) {
      if(error) return res.status(200).send({ "ERROR": "User avatar is not a gif" })
      if (!error && response.statusCode == 200) {
        res.status(200).send(response.body);
      }
    });
  });

  // <=================> legacy User <=================>

  app.get("/legacy/avatar", apiLimiter, async(req, res) => {
    const user = req.query.user;
    if (!user) return res.status(200).send({ "ERROR": "No data" });
    
    let userrecoce;
    try {
      userrecoce = await client.users.fetch(user);
    } catch (e) {
      res.status(200).send({ "ERROR": "User not found" });
      return;
    }

    let url;
    try {
      url = `https://cdn.discordapp.com/avatars/${await userrecoce.id}/${await userrecoce.avatar}.png?size=1024`
    } catch (e) {
      res.status(200).send({ "ERROR": "User not found" });
      return;
    }
    await res.set({ 'Content-Type': 'image/png' });

    await request({ url: url, encoding: null }, function(error, response, body) {
      if(error) return res.status(200).send({ "ERROR": "User avatar is not a gif" })
      if (!error && response.statusCode == 200) {
        res.status(200).send(response.body);
      }
    });
  });

});

// <=================> legacy Home <=================>

app.get("/legacy", async(req, res) => {
  res.status(200).render("legacy.ejs", { url : config.URL });
});

// <=================> Start Code <=================>

app.listen(config.Port, () => {
  console.log(`API ✔️ (${config.Port})`);
});

client.login(process.env.TOKEN);