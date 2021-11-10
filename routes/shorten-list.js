const Shorten = require("../assets/schema/shorten");

module.exports = {
    name: "api/shorten/list",

    run: async (req, res) => {
      res.json({ data: await Shorten.find() });
    }
}