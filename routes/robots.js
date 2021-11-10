module.exports = {
    name: "robots.txt",

    run: async (req, res) => {
      res.status(200).send("User-Agent: * Allow: /");
    }
}