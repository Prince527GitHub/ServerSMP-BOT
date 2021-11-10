const Shorten = require("./assets/schema/shorten");
const Codebin = require("./assets/schema/codebin");
const Str = require('@supercharge/strings');
const serveIndex = require('serve-index');
const config = require("./config.json");
const express = require("express");
const chalk = require('chalk');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();

// <=================> AntiCrash <=================>

process.on("unhandledRejection", (reason, p) => {
    console.warn(chalk.red("[antiCrash]") + chalk.white(": Unhandled Rejection/Catch"));
    console.error(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.warn(chalk.red("[antiCrash]") + chalk.white(": Uncaught Exception/Catch"));
    console.error(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.warn(chalk.red("[antiCrash]") + chalk.white(": Uncaught Exception/Catch (MONITOR)"));
    console.error(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.warn(chalk.red("[antiCrash]") + chalk.white(": Multiple Resolves"));
    console.error(type, promise, reason);
}); 

// <=================> RateLimit <=================>

const rateLimit = require("express-rate-limit");

// General rate limiter

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many request from this IP, please try again after 15 minutes."
});

app.use("/api-ratelimit/", apiLimiter);

// Codebin rate limiter

const codeLimiter = rateLimit({
    windowMs: 10000, // 15 minutes
    max: 20,
    message: "You can only create 2 codebins in 10 seconds!"
});

// Codebin rate limiter but for json

const codeLimiterJson = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: "You can only create 10 codebins in 15 minutes!"
});

app.use("/api/codebin/json", codeLimiter);

// Shorten rate limiter

const shortenLimiter = rateLimit({
    windowMs: 10000, // 15 minutes
    max: 20,
    message: "You can only create 2 urls in 10 seconds!"
});

// Shorten rate limiter but for json

const shortenLimiterJson = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: "You can only create 20 urls in 15 minutes!"
});

app.use("/api/shorten/json", shortenLimiterJson);

// Poll login

const pollLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: "You can only login 20 times in 15 minutes!"
});

app.use("/api/poll/login", pollLoginLimiter);

// Poll create

const pollCreateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: "You can only create 20 polls in 15 minutes!"
});

app.use("/api/poll/create", pollCreateLimiter);

// Poll vote

const pollVoteLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    message: "You can only vote 50 times in 15 minutes!"
});

app.use("/api/poll/add", pollVoteLimiter);

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: "You can only upload 200 times in 15 minutes!"
});

// Email

const emailLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 25,
    message: "You can only sent 25 emails in 15 minutes!"
});

app.use("/email/send", emailLimiter);

// <=================> MongoDB <=================>

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// <=================> Functions <=================>

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

// <=================> Request Logging <=================>

const { reqLog } = require('@popovmp/req-log');

app.use(reqLog());

// <=================> Handeler <=================>

require("./routes")(app);

// <=================> Allow fetch <=================>

app.use(cors());

// <=================> Parse application/json <=================>

app.use(express.json());

// <=================> Parse application/x-www-form-urlencoded <=================>

app.use(express.urlencoded({
    extended: true
}));

// <=================> Make json look better <=================>

app.set("json spaces", 1)

// <=================> Assests <=================>

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/assets', serveIndex('assets'));

// <=================> Home <=================>

app.get("/", (req, res) => {
    res.status(200).render("index.ejs", {
        url: config.URL
    });
});

// <=================> CodeBin <=================>

app.post("/codebin/create", codeLimiter, async (req, res) => {
    if (req.body) {
        if (req.body.text) {
            if (req.body.text !== "Enter text to bin...") {
                if (req.body.text.length > 10000) return res.status(500).render("codebin.ejs", {
                    url: config.URL,
                    length: true,
                    dtext: false,
                    error: false
                });
                Codebin.findOne({
                    Text: req.body.text
                }, async (err, data) => {
                    if (data) return res.redirect(`/codebin/${data.Code}`);
                    if (!data) {
                        const random = Str.random();
                        async function isData(code) {
                            Codebin.findOne({
                                Code: code
                            }, async (err2, data2) => {
                                if (data2) {
                                    const randomNew = Str.random();
                                    return isData(randomNew);
                                } else {
                                    new Codebin({
                                        Code: random,
                                        Text: req.body.text,
                                    }).save();
                                    res.redirect(`/codebin/${random}`);
                                }
                            });
                        }
                        isData(random);
                    }
                });
            } else return res.status(500).render("codebin.ejs", {
                url: config.URL,
                length: false,
                dtext: true,
                error: false
            });
        } else return res.status(500).render("codebin.ejs", {
            url: config.URL,
            length: false,
            dtext: false,
            error: true
        });
    } else return res.status(500).render("codebin.ejs", {
        url: config.URL,
        length: false,
        dtext: false,
        error: true
    });
});

// <=================> Shorten <=================>

app.post("/shorten/create", shortenLimiter, async (req, res) => {
    if (req.body) {
        if (req.body.url && req.body.code) {
            if (isValidHttpUrl(req.body.url)) {
                Shorten.findOne({
                    Code: req.body.code
                }, async (err, data) => {
                    if (data) return res.status(200).render("shorten.ejs", {
                        url: config.URL,
                        allready: true,
                        error: false,
                        isurl: false,
                        done: false,
                        extension: false,
                        url2: config.URL2
                    });
                    if (!data) {
                        new Shorten({
                            Code: req.body.code,
                            Url: req.body.url,
                        }).save();
                        res.status(200).render("shorten.ejs", {
                            url: config.URL,
                            allready: false,
                            error: true,
                            isurl: true,
                            done: true,
                            extension: req.body.code,
                            url2: config.URL2
                        });
                    }
                });
            } else return res.status(200).render("shorten.ejs", {
                url: config.URL,
                allready: false,
                error: false,
                isurl: true,
                done: false,
                extension: false,
                url2: config.URL2
            });
        } else return res.status(200).render("shorten.ejs", {
            url: config.URL,
            allready: false,
            error: true,
            isurl: false,
            done: false,
            extension: false,
            url2: config.URL2
        });
    } else return res.status(200).render("shorten.ejs", {
        url: config.URL,
        allready: false,
        error: true,
        isurl: false,
        done: false,
        extension: false,
        url2: config.URL2
    });
});

// <=================> Upload <=================>

const fileUpload = require('express-fileupload');
const axios = require('axios').default;
const FormData = require('form-data');

app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024 * 2
    },
    safeFileNames: true,
    preserveExtension: true,
    abortOnLimit: true,
    uriDecodeFileNames: true,
}));

app.post('/upload', uploadLimiter, async (req, res) => {
    if (req.body.key !== process.env.KEY) {
      if(req.body.json) return res.status(500).json({ error: "An error has occurred" });
      return res.status(500).redirect("/upload");
    }
    if (!req.files || Object.keys(req.files).length === 0) {
      if(req.body.json) return res.status(500).json({ error: "An error has occurred" });
      return res.status(500).redirect("/upload");
    }
    const formData = new FormData();
    formData.append("file", req.files.file.data);
    formData.append("name", req.files.file.name);
    formData.append("key", req.body.key);
    if(req.body.folder && req.body.folder.length !== 0) formData.append("folder", String(req.body.folder.split(" ").slice(0)));
    if(req.body.audiotomp4) formData.append("audiotomp4", "true");
    axios.post(`${process.env.URL}/upload`, formData, {
            headers: formData.getHeaders(),
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        })
        .then(function (response) {
            if(req.body.json) {
              if(req.body.embed_name) {
                if(req.body.embed_color) {
                  if(req.body.embed_description) {
                    return res.status(200).json({ url: encodeURI(`${config.URL}${response.data.image}?embed_name=${req.body.embed_name}&embed_color=${req.body.embed_color}&embed_description=${req.body.embed_description}`), thumb: encodeURI(`${config.URL}${response.data.image}?embed_name=${req.body.embed_name}&embed_color=${req.body.embed_color}&embed_description=${req.body.embed_description}`), del_url: encodeURI(`${config.URL}${response.data.image}?del=true&key=`) });
                  } else return res.status(200).json({ url: encodeURI(`${config.URL}${response.data.image}?embed_name=${req.body.embed_name}&embed_color=${req.body.embed_color}`), thumb: encodeURI(`${config.URL}${response.data.image}?embed_name=${req.body.embed_name}&embed_color=${req.body.embed_color}`), del_url: encodeURI(`${config.URL}${response.data.image}?del=true&key=`) });
                } else return res.status(200).json({ url: encodeURI(`${config.URL}${response.data.image}?embed_name=${req.body.embed_name}`), thumb: encodeURI(`${config.URL}${response.data.image}?embed_name=${req.body.embed_name}`), del_url: encodeURI(`${config.URL}${response.data.image}?del=true&key=`) });
              } else return res.status(200).json({ url: encodeURI(`${config.URL}${response.data.image}`), thumb: encodeURI(`${config.URL}${response.data.image}`), del_url: encodeURI(`${config.URL}${response.data.image}?del=true&key=`) });
            } else return res.redirect(encodeURI(`${response.data.image}`));
        })
        .catch(function (error) {
            console.log(error);
            if(req.body.json) return res.status(500).json({ error: "An error has occurred" });
            return res.status(500).redirect("/upload");
        });
});

// <=================> Auth <=================>

const Account = require("./assets/schema/account.js");
const TokenGenerator = require('uuid-token-generator');
const QuickEncrypt = require('quick-encrypt');

app.post("/auth/:option", async (req, res) => {
    const query = req.params.option.toLowerCase();
    if (query === "create") {
        if (req.body.username && req.body.password) {
            if (req.body.username.length > 100) {
              if (req.body.web) return res.status(400).render("auth.ejs", {
                url: config.URL,
                error: true,
                errorText: "username to long",
                login: false,
                token: "",
                password: "",
              });
              return res.status(400).json({ status: "error: username to long" });
            }
            Account.findOne({
                Username: req.body.username
            }, async (err, data) => {
                if (data) {
                  if (req.body.web) return res.status(500).render("auth.ejs", {
                    url: config.URL,
                    error: true,
                    errorText: "username allready exsist",
                    login: false,
                    token: "",
                    password: "",
                  });
                  return res.status(500).json({ status: "error: name allready" });
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
                        Username: req.body.username,
                        Password: QuickEncrypt.encrypt(req.body.password, process.env.PUBLIC_KEY),
                        Token: dataToken,
                    }).save();
                    if (req.body.web) return res.status(200).render("auth.ejs", {
                      url: config.URL,
                      error: true,
                      errorText: "account created",
                      login: false,
                      token: "",
                      password: "",
                    });
                    return res.status(200).json({ status: "account created" });
                }
            });
        } else {
          if (req.body.web) return res.status(400).render("auth.ejs", {
            url: config.URL,
            error: true,
            errorText: "no data",
            login: false,
            token: "",
            password: "",
          });
          return res.status(400).json({ status: "error: no data" });
        }
    } else if (query === "get") {
        if (req.body.token) {
            Account.findOne({
                Token: req.body.token
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
        if (req.body.username && req.body.password) {
            Account.findOne({
                Username: req.body.username
            }, async (err, data) => {
                if (!data) {
                  if (req.body.web) return res.status(500).render("auth.ejs", {
                    url: config.URL,
                    error: true,
                    errorText: "no account",
                    login: false,
                    token: "",
                    password: "",
                  });
                  return res.status(500).json({ token: "error: no account" });
                }
                if (data) {
                    if (QuickEncrypt.decrypt(data.Password, process.env.PRIVITE_KEY) === req.body.password) {
                        data.delete();
                        if (req.body.web) return res.status(400).render("auth.ejs", {
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
                      if (req.body.web) return res.status(400).render("auth.ejs", {
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
          if (req.body.web) return res.status(400).render("auth.ejs", {
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
        if (req.body.username && req.body.password) {
            Account.findOne({
                Username: req.body.username
            }, async (err, data) => {
                if (!data) {
                  if (req.body.web) return res.status(500).render("auth.ejs", {
                    url: config.URL,
                    error: true,
                    errorText: "no account",
                    login: false,
                    token: "",
                    password: "",
                  });
                  return res.status(500).json({ token: "error: no account" });
                }
                if (data) {
                    if (QuickEncrypt.decrypt(data.Password, process.env.PRIVITE_KEY) === req.body.password) {
                        if (req.body.web) return res.status(200).render("auth.ejs", {
                          url: config.URL,
                          error: false,
                          errorText: "",
                          login: true,
                          token: data.Token,
                          password: req.body.password,
                        });
                        return res.status(200).json({ token: data.Token });
                    } else {
                      if (req.body.web) return res.status(400).render("auth.ejs", {
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
          if (req.body.web) return res.status(400).render("auth.ejs", {
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
      if (req.body.web) return res.status(400).render("auth.ejs", {
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
});

// <=================> Admin <=================>

// const Codebin = require("./assets/schema/codebin");
// const Shorten = require("./assets/schema/shorten");
const Poll = require("./assets/schema/poll");
// const config = require("./config.json");
const {
    MongoDB
} = require("ark.db");

const db_mongo = new MongoDB(process.env.MONGO, "ark.db");

app.get("/admin", async(req, res) => {
  if(req.query.token) {
    if(process.env.PASSWORD.includes(req.query.token)) {

        let shorten;
        Shorten.count({}, function (err, count) {
            shorten = count;
        });

        let codebin;
        Codebin.count({}, function (err, count) {
            codebin = count;
        });

        let poll;
        Poll.count({}, function (err, count) {
            poll = count;
        });

        let guildNumber;
        let userNumber;
        let channelNumber;
        let commandsUsed;
        let commandsNumber;
        let polls;
        let npm;

        if (await db_mongo.has(`${process.env.USERNAME}-guilds`) === true) {
            guildNumber = await db_mongo.get(`${process.env.USERNAME}-guilds`);
        } else {
            guildNumber = "no data";
        }

        if (await db_mongo.has(`${process.env.USERNAME}-users`) === true) {
            userNumber = await db_mongo.get(`${process.env.USERNAME}-users`);
        } else {
            userNumber = "no data";
        }

        if (await db_mongo.has(`${process.env.USERNAME}-channels`) === true) {
            channelNumber = await db_mongo.get(`${process.env.USERNAME}-channels`);
        } else {
            channelNumber = "no data";
        }

        if (await db_mongo.has(`${process.env.USERNAME}-commands`) === true) {
            commandsNumber = await db_mongo.get(`${process.env.USERNAME}-commands`);
        } else {
            commandsNumber = "no data";
        }

        if (await db_mongo.has(`${process.env.USERNAME}-cmdUsed`) === true) {
            commandsUsed = await db_mongo.get(`${process.env.USERNAME}-cmdUsed`);
        } else {
            commandsUsed = "no data";
        }

        if (await db_mongo.has("npm") === true) {
            npm = await db_mongo.get("npm");
        } else {
            npm = "no data";
        }

        if(await db_mongo.has("polls") === true) {
          polls = await db_mongo.get("polls");
        } else {
          polls = "no data";
        }

        res.status(200).render("admins.ejs", {
            url: config.URL,
            servers: guildNumber,
            users: userNumber,
            channels: channelNumber,
            cmdsUsed: commandsUsed,
            commands: commandsNumber,
            codebin: codebin,
            shorten: shorten,
            npm: npm,
            polls: polls,
            poll: poll,
            password: req.query.password,
        });
    } else return res.status(500).redirect("/");
  } else return res.status(500).redirect("/");
});

// <=================> Start Code <=================>

app.listen(config.Port, () => {
    console.log(chalk.green('> API Running\n'))
    console.log(chalk.green(`> Server Listening on Port ${config.Port}`))
    console.log(chalk.green("> Loaded Endpoints"))
});