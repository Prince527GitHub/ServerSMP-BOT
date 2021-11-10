module.exports = {
    name: "api/joke",

    run: async (req, res) => {
        const jokeString = require("../assets/js/joke.js");
        const randomNumber = Math.floor(Math.random() * jokeString.length);
        res.status(200).json({
            "joke": `${jokeString[randomNumber]}`
        });
    }
}