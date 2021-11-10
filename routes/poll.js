const config = require("../config.json");

module.exports = {
    name: "poll",
    run: async (req, res) => {
      res.status(200).render("poll.ejs", {
        error: false,
        option: "create",
        url: config.URL,
        question: "",
        id: "",
        id_error: "",
        exist: false,
        passcode: "",
        votesFalse: "",
        votesTrue: "",
      });
    }
}