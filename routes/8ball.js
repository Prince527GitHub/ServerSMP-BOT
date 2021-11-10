module.exports = {
    name: "api/8ball",

    run: async (req, res) => {
        const _8ball = require("../assets/js/8ball.js");
        const randomNumber = Math.floor(Math.random() * _8ball.length);
        res.status(200).json(_8ball[randomNumber]);
    }
}