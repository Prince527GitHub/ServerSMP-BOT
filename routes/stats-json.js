const Codebin = require("../assets/schema/codebin");
const Shorten = require("../assets/schema/shorten");
const Poll = require("../assets/schema/poll");
const config = require("../config.json");
const {
    MongoDB
} = require("ark.db");

const db_mongo = new MongoDB(process.env.MONGO, "ark.db");

module.exports = {
    name: "api-ratelimit/stats",

    run: async (req, res) => {

        let shorten;
        Shorten.count({}, function (err, count) {
            shorten = count;
        });

        let codebin;
        Codebin.count({}, function (err, count) {
            codebin = count;
        });

        let poll;
        Poll.count({}, function (err, count) {
            poll = count;
        });

        let guildNumber;
        let userNumber;
        let channelNumber;
        let commandsUsed;
        let commandsNumber;
        let polls;
        let npm;

        if (await db_mongo.has(`${process.env.USERNAME}-guilds`) === true) {
            guildNumber = await db_mongo.get(`${process.env.USERNAME}-guilds`);
        } else {
            guildNumber = "no data";
        }

        if (await db_mongo.has(`${process.env.USERNAME}-users`) === true) {
            userNumber = await db_mongo.get(`${process.env.USERNAME}-users`);
        } else {
            userNumber = "no data";
        }

        if (await db_mongo.has(`${process.env.USERNAME}-channels`) === true) {
            channelNumber = await db_mongo.get(`${process.env.USERNAME}-channels`);
        } else {
            channelNumber = "no data";
        }

        if (await db_mongo.has(`${process.env.USERNAME}-commands`) === true) {
            commandsNumber = Number(await db_mongo.get(`${process.env.USERNAME}-commands`));
        } else {
            commandsNumber = "no data";
        }

        if (await db_mongo.has(`${process.env.USERNAME}-cmdUsed`) === true) {
            commandsUsed = Number(await db_mongo.get(`${process.env.USERNAME}-cmdUsed`));
        } else {
            commandsUsed = "no data";
        }

        if (await db_mongo.has("npm") === true) {
            npm = await db_mongo.get("npm");
        } else {
            npm = "no data";
        }

        if(await db_mongo.has("polls") === true) {
          polls = Number(await db_mongo.get("polls"));
        } else {
          polls = "no data";
        }

        res.status(200).json({
            servers: guildNumber,
            users: userNumber,
            channels: channelNumber,
            cmdsUsed: commandsUsed,
            commands: commandsNumber,
            codebin: codebin,
            shorten: shorten,
            npm: npm,
            totalPolls: polls,
            currentPolls: poll,
        });
    }
}