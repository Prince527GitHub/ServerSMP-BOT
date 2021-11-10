const config = require("../config.json");

module.exports = {
    name: "auth",

    run: async (req, res) => {
      res.status(200).render("auth.ejs", {
        url: config.URL,
        error: false,
        errorText: "",
        login: false,
        token: "",
        password: "",
      })
    }
}