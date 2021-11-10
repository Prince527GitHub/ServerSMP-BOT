const Codebin = require("../assets/schema/codebin");

module.exports = {
    name: "api/codebin/list",

    run: async (req, res) => {
      res.status(200).json({ data: await Codebin.find() })
    }
}