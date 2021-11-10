const Codebin = require("../assets/schema/codebin");
const config = require("../config.json");

module.exports = {
    name: "codebin",

    run: async (req, res) => {
        if (req.query.id) {
          res.status(304).redirect(`/codebin/${req.query.id}`);
        } else {
            res.status(200).render("codebin.ejs", {
                url: config.URL,
                length: false,
                dtext: false,
                error: false
            });
        }
    }
}