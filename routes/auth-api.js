const Account = require("../assets/schema/account.js");
const TokenGenerator = require('uuid-token-generator');
const QuickEncrypt = require('quick-encrypt');
const config = require("../config.json");

module.exports = {
    name: "auth/:option",

    run: async (req, res) => {

        const query = req.params.option.toLowerCase();
        if (query === "create") {
            if (req.query.username && req.query.password) {
                if (req.query.username.length > 100) {
                    if (req.query.web) return res.status(400).render("auth.ejs", {
                        url: config.URL,
                        error: true,
                        errorText: "username to long",
                        login: false,
                        token: "",
                        password: "",
                    });
                    return res.status(400).json({
                        status: "error: username to long"
                    });
                }
                Account.findOne({
                    Username: req.query.username
                }, async (err, data) => {
                    if (data) {
                        if (req.query.web) return res.status(500).render("auth.ejs", {
                            url: config.URL,
                            error: true,
                            errorText: "username allready exsist",
                            login: false,
                            token: "",
                            password: "",
                        });
                        return res.status(500).json({
                            status: "error: name allready"
                        });
                    }
                    if (!data) {
                        let dataToken;
                        const token = new TokenGenerator(512, TokenGenerator.BASE62);
                        dataToken = token.generate();
                        const dataCheck = Account.findOne({
                            Token: dataToken
                        });
                        if (dataCheck) dataToken = token.generate();
                        new Account({
                            Username: req.query.username,
                            Password: QuickEncrypt.encrypt(req.query.password, process.env.PUBLIC_KEY),
                            Token: dataToken,
                        }).save();
                        if (req.query.web) return res.status(200).render("auth.ejs", {
                            url: config.URL,
                            error: true,
                            errorText: "account created",
                            login: false,
                            token: "",
                            password: "",
                        });
                        return res.status(200).json({
                            status: "account created"
                        });
                    }
                });
            } else {
                if (req.query.web) return res.status(400).render("auth.ejs", {
                    url: config.URL,
                    error: true,
                    errorText: "no data",
                    login: false,
                    token: "",
                    password: "",
                });
                return res.status(400).json({
                    status: "error: no data"
                });
            }
        } else if (query === "get") {
            if (req.query.token) {
                Account.findOne({
                    Token: req.query.token
                }, async (err, data) => {
                    if (!data) return res.status(500).json({
                        username: "error: no account",
                        token: "error: no account"
                    });
                    if (data) return res.status(200).json({
                        username: data.Username,
                        token: data.Token
                    });
                });
            } else return res.status(400).json({
                username: "error: no data",
                token: "error: no data"
            });
        } else if (query === "delete") {
            if (req.query.username && req.query.password) {
                Account.findOne({
                    Username: req.query.username
                }, async (err, data) => {
                    if (!data) {
                        if (req.query.web) return res.status(500).render("auth.ejs", {
                            url: config.URL,
                            error: true,
                            errorText: "no account",
                            login: false,
                            token: "",
                            password: "",
                        });
                        return res.status(500).json({
                            token: "error: no account"
                        });
                    }
                    if (data) {
                        if (QuickEncrypt.decrypt(data.Password, process.env.PRIVITE_KEY) === req.query.password) {
                            data.delete();
                            if (req.query.web) return res.status(400).render("auth.ejs", {
                                url: config.URL,
                                error: true,
                                errorText: "account deleted",
                                login: false,
                                token: "",
                                password: "",
                            });
                            return res.status(200).status({
                                status: "account deleted"
                            });
                        } else {
                            if (req.query.web) return res.status(400).render("auth.ejs", {
                                url: config.URL,
                                error: true,
                                errorText: "bad password",
                                login: false,
                                token: "",
                                password: "",
                            });
                            return res.status(400).json({
                                status: "error: bad password"
                            });
                        }
                    }
                });
            } else {
                if (req.query.web) return res.status(400).render("auth.ejs", {
                    url: config.URL,
                    error: true,
                    errorText: "no data",
                    login: false,
                    token: "",
                    password: "",
                });
                return res.status(400).json({
                    status: "error: no data"
                });
            }
        } else if (query === "login") {
            if (req.query.username && req.query.password) {
                Account.findOne({
                    Username: req.query.username
                }, async (err, data) => {
                    if (!data) {
                        if (req.query.web) return res.status(500).render("auth.ejs", {
                            url: config.URL,
                            error: true,
                            errorText: "no account",
                            login: false,
                            token: "",
                            password: "",
                        });
                        return res.status(500).json({
                            token: "error: no account"
                        });
                    }
                    if (data) {
                        if (QuickEncrypt.decrypt(data.Password, process.env.PRIVITE_KEY) === req.query.password) {
                            if (req.query.web) return res.status(200).render("auth.ejs", {
                                url: config.URL,
                                error: false,
                                errorText: "",
                                login: true,
                                token: data.Token,
                                password: req.query.password,
                            });
                            return res.status(200).json({
                                token: data.Token
                            });
                        } else {
                            if (req.query.web) return res.status(400).render("auth.ejs", {
                                url: config.URL,
                                error: true,
                                errorText: "bad password",
                                login: false,
                                token: "",
                                password: "",
                            });
                            return res.status(400).json({
                                token: "error: bad password"
                            });
                        }
                    }
                });
            } else {
                if (req.query.web) return res.status(400).render("auth.ejs", {
                    url: config.URL,
                    error: true,
                    errorText: "no data",
                    login: false,
                    token: "",
                    password: "",
                });
                return res.status(400).json({
                    token: "error: no data"
                });
            }
        } else {
            if (req.query.web) return res.status(400).render("auth.ejs", {
                url: config.URL,
                error: false,
                errorText: "",
                login: false,
                token: "",
                password: "",
            });
            return res.status(400).json({
                error: "no data"
            });
        }

    }
}