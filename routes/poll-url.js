const Poll = require("../assets/schema/poll");
const config = require("../config.json");

module.exports = {
    name: "poll/:code",
    run: async (req, res) => {
      if (req.params.code.toLowerCase() === "login") return res.status(200).render("poll.ejs", {
        error: false,
        option: "login",
        url: config.URL,
        question: "",
        id: "",
        id_error: "",
        exist: false,
        passcode: "",
        votesFalse: "",
        votesTrue: "",
      });
      Poll.findOne({
        Code: req.params.code
      }, async (err, data) => {
        if (data) {
            if (req.query.votes) {
                return res.status(200).render("poll.ejs", {
                    error: false,
                    option: "votes",
                    url: config.URL,
                    question: data.Question,
                    id: data.Code,
                    id_error: "",
                    exist: false,
                    passcode: "",
                    votesFalse: data.False,
                    votesTrue: data.True,
                });
            } else return res.status(200).render("poll.ejs", {
                error: false,
                option: "vote",
                url: config.URL,
                question: data.Question,
                id: data.Code,
                id_error: "",
                exist: false,
                passcode: "",
                votesFalse: "",
                votesTrue: "",
            });
        }
        if (!data) return res.status(500).render("poll.ejs", {
            error: false,
            option: "vote",
            url: config.URL,
            question: "Poll does not exist.",
            id: "Poll does not exist.",
            id_error: "",
            exist: true,
            passcode: "",
            votesFalse: "",
            votesTrue: "",
        });
      });
    }
}