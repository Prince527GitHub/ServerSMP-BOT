const Shorten = require("../assets/schema/shorten");
const config = require("../config.json");

module.exports = {
    name: "shorten",

    run: async (req, res) => {
        if (req.query.id) {
            Shorten.findOne({
                Code: req.query.id
            }, async (err, data) => {
                if (!data) return res.redirect(`${config.URL}/shorten`);
                if (data) {
                    res.redirect(data.Url);
                }
            });
        } else {
            res.status(200).render("shorten.ejs", {
                url: config.URL,
                allready: false,
                error: false,
                isurl: false,
                done: false,
                extension: false,
                url2: config.URL2
            });
        }
    }
}