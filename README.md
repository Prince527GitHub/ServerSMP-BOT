# ServerSMP - BOT

This is a discord bot, that has a lot of stuff in it like meme's, economy, admin, extra, etc.

### Pre-Setup (it is from ```Discord.py Music Bot```)

If you don't already have a discord bot, click [here](https://discordapp.com/developers/), accept any prompts then click "New Application" at the top right of the screen.  Enter the name of your bot then click accept.  Click on Bot from the panel from the left, then click "Add Bot."  When the prompt appears, click "Yes, do it!"
![Left panel](https://i.imgur.com/hECJYWK.png)

Then, click copy under token to get your bot's token. Your bot's icon can also be changed by uploading an image.

![Bot token area](https://i.imgur.com/da0ktMC.png)

### Heroku
This clone's the project to [Heroku](https://heroku.com/).

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Setup

This bot need's a bot token, so you need to add a ```.env``` for ```TOKEN``` (that will be your bot token). Then change the name/prefix of the bot in bot.js and change the website a bit for your bot (the website like the html is at ```/website/index.html``` and ```/views/commands.ejs```).

### Uptime

So to keep the bot runing for 24/7 you need to copy the main website url then go to [uptimerobot.com](https://uptimerobot.com/) make a account, verify you account then click "Add New Monitor"

Then do this (it is from ```Discord.py Music Bot```)

+ For Monitor Type select "HTTP(s)"
+ In Friendly Name put the name of your bot
+ For your url, put the url of the website made for your repl.
+ Select any alert contacts you want, then click "Create Monitor"
![Uptime robot example](https://i.imgur.com/Qd9LXEy.png)


Your bot should now be good to go, with near 100% uptime.
