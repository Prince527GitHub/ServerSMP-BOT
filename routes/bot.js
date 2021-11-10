const config = require("../config.json");
const {
    MongoDB
} = require("ark.db");

const db_mongo = new MongoDB(process.env.MONGO, "ark.db");

module.exports = {
    name: "bot",

    run: async (req, res) => {

        let guildNumber;
        let userNumber;

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

        res.status(200).render("bot.ejs", {
            servers: guildNumber,
            users: userNumber
        });
    }
}