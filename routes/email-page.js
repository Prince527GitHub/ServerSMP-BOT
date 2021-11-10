const config = require("../config.json");

module.exports = {
    name: "email",

    run: async (req, res) => {
      res.status(200).render("email.ejs", {
            error: false,
            success: false,
            url: config.URL,
      });
    }
}