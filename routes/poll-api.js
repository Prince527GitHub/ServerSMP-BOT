const QuickEncrypt = require('quick-encrypt');
const Poll = require("../assets/schema/poll");
const Str = require('@supercharge/strings');
const config = require("../config.json");
const {
    MongoDB
} = require("ark.db");

const db_mongo = new MongoDB(process.env.MONGO, "ark.db");

module.exports = {
    name: "api/poll/:option",
    run: async (req, res) => {
    const query = req.params.option.toLowerCase();
    if (query === "add") {
        if (req.query.id) {
            if (req.query.option) {
                Poll.findOne({
                    Code: req.query.id
                }, async (err, data) => {
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
                    if (data) {
                        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                        if(data.IPs.includes(ip)) return res.status(200).redirect(`${config.URL}/poll/${data.Code}?votes=true`);
                        if (req.query.option.toLowerCase() === "false") {
                            data.False = `${Number(data.False) + 1}`;
                            data.IPs.push(ip);
                            data.save();
                            return res.status(200).redirect(`/poll/${data.Code}?votes=true`);
                        } else if (req.query.option.toLowerCase() === "true") {
                            data.True = `${Number(data.True) + 1}`;
                            data.IPs.push(ip);
                            data.save();
                            return res.status(200).redirect(`/poll/${data.Code}?votes=true`);
                        } else return res.status(500).render("poll.ejs", {
                            error: true,
                            option: "vote",
                            url: config.URL,
                            question: "ERROR",
                            id: "ERROR",
                            id_error: req.query.id,
                            exist: false,
                            passcode: "",
                            votesFalse: "",
                            votesTrue: "",
                        });
                    }
                });
            } else return res.status(500).render("poll.ejs", {
                error: true,
                option: "vote",
                url: config.URL,
                question: "ERROR",
                id: "ERROR",
                id_error: "",
                exist: false,
                passcode: "",
                votesFalse: "",
                votesTrue: "",
            });
        } else return res.status(500).render("poll.ejs", {
            error: true,
            option: "vote",
            url: config.URL,
            question: "ERROR",
            id: "ERROR",
            id_error: "",
            exist: false,
            passcode: "",
            votesFalse: "",
            votesTrue: "",
        });
    } else if (query === "create") {
        if (req.query.question) {
            if (req.query.password) {
                const random = await Str.random();
                Poll.findOne({
                    Code: random
                }, async (err, data) => {
                    if (data) return res.status(200).redirect(`${config.URL}/poll/create?question=${req.query.question}&password=${req.query.password}`);
                    if (!data) {
                        new Poll({
                            Code: random,
                            Passcode: QuickEncrypt.encrypt(req.query.password, process.env.PUBLIC_KEY),
                            Question: req.query.question,
                            True: "0",
                            False: "0",
                        }).save();
                        
                        if(await db_mongo.has("polls") === true) {
                          await db_mongo.set("polls", `${Number(await db_mongo.get("polls")) + 1}`);
                        } else {
                          await db_mongo.set("polls", `0`);
                        }
                        
                        return res.status(200).redirect(`${config.URL}/poll/${random}`);
                    }
                });
            } else return res.status(500).render("poll.ejs", {
                error: true,
                option: "create",
                url: config.URL,
                question: "ERROR",
                id: "ERROR",
                id_error: "",
                exist: false,
                passcode: "",
                votesFalse: "",
                votesTrue: "",
            });
        } else return res.status(500).render("poll.ejs", {
            error: true,
            option: "create",
            url: config.URL,
            question: "ERROR",
            id: "ERROR",
            id_error: "",
            exist: false,
            passcode: "",
            votesFalse: "",
            votesTrue: "",
        });
    } else if (query === "login") {
        if (req.query.password && req.query.id) {
            Poll.findOne({
                Code: req.query.id
            }, async (err, data) => {
                if (!data) return res.status(500).render("poll.ejs", {
                    error: false,
                    option: "login",
                    url: config.URL,
                    question: "",
                    id: "",
                    id_error: "login",
                    exist: true,
                    passcode: "",
                    votesFalse: "",
                    votesTrue: "",
                });
                if (data) {
                    const decrypt = QuickEncrypt.decrypt(data.Passcode, process.env.PRIVITE_KEY)
                    if (decrypt === req.query.password) {
                        return res.status(200).render("poll.ejs", {
                            error: false,
                            option: "dashboard",
                            url: config.URL,
                            question: data.Question,
                            id: data.Code,
                            id_error: "",
                            exist: false,
                            passcode: decrypt,
                            votesFalse: data.False,
                            votesTrue: data.True,
                        });
                    } else return res.status(500).render("poll.ejs", {
                        error: true,
                        option: "login",
                        url: config.URL,
                        question: "",
                        id: "",
                        id_error: "login",
                        exist: false,
                        passcode: "",
                        votesFalse: "",
                        votesTrue: "",
                    });
                }
            });
        } else return res.status(500).render("poll.ejs", {
            error: true,
            option: "login",
            url: config.URL,
            question: "",
            id: "",
            id_error: "login",
            exist: false,
            passcode: "",
            votesFalse: "",
            votesTrue: "",
        });
    } else if (query === "delete") {
        if (req.query.password) {
            if (req.query.id) {
                Poll.findOne({
                    Code: req.query.id
                }, async (err, data) => {
                    if (data) {
                        if (QuickEncrypt.decrypt(data.Passcode, process.env.PRIVITE_KEY) === req.query.password) {
                            data.delete();
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
                        } else return res.status(500).render("poll.ejs", {
                            error: false,
                            option: "votes",
                            url: config.URL,
                            question: "",
                            id: "",
                            id_error: "",
                            exist: true,
                            passcode: "",
                            votesFalse: "",
                            votesTrue: "",
                        });
                    } else return res.status(500).render("poll.ejs", {
                        error: false,
                        option: "votes",
                        url: config.URL,
                        question: "",
                        id: "",
                        id_error: "",
                        exist: true,
                        passcode: "",
                        votesFalse: "",
                        votesTrue: "",
                    });
                });
            } else return res.status(500).render("poll.ejs", {
                error: true,
                option: "dashboard",
                url: config.URL,
                question: "ERROR",
                id: "ERROR",
                id_error: "",
                exist: false,
                passcode: "ERROR",
                votesFalse: "ERROR",
                votesTrue: "ERROR",
            });
        } else return res.status(500).render("poll.ejs", {
            error: true,
            option: "dashboard",
            url: config.URL,
            question: "ERROR",
            id: "ERROR",
            id_error: "",
            exist: false,
            passcode: "ERROR",
            votesFalse: "ERROR",
            votesTrue: "ERROR",
        });
    } else return res.status(500).redirect(`${config.URL}/poll`);
    }
}