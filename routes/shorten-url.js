const Shorten = require("../assets/schema/shorten");
const config = require("../config.json");

module.exports = {
    name: "shorten/:code",

    run: async (req, res) => {
        Shorten.findOne({
            Code: req.params.code
        }, async (err, data) => {
            if (!data) return res.status(200).send("No data was found.");
            if (data) return res.redirect(data.Url);
        });
    }
}