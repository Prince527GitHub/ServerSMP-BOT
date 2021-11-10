const Codebin = require("../assets/schema/codebin");
const config = require("../config.json");

module.exports = {
    name: "codebin/:code",

    run: async (req, res) => {
        Codebin.findOne({
            Code: req.params.code
        }, async (err, data) => {
            if (!data) return res.status(200).send("No data was found.");
            if (data) return res.status(200).render("codebin-id.ejs", {
                text: data.Text,
                id: data.Code,
                url: config.URL
            });
        });
    }
}