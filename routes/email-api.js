const nodemailer = require("nodemailer");
const config = require("../config.json");

module.exports = {
    name: "email/:option",

    run: async (req, res) => {
        const query = req.params.option.toLowerCase();
        if (query === "send") {
            if (req.query.sender) {
                if (req.query.subject) {
                    if (req.query.text) {
                        if (req.query.text.length > 5000) {
                            if (req.query.json) return res.status(500).json({
                                status: "text length cant be more then 5000"
                            });
                            res.status(500).render("email.ejs", {
                                error: true,
                                success: false,
                                url: config.URL,
                            });
                        }
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 465,
                            secure: true,
                            auth: {
                                user: process.env.EMAIL_USERNAME,
                                pass: process.env.EMAIL_PASSWORD,
                            },
                        });
                        const mailOptions = {
                            from: process.env.EMAIL_USERNAME,
                            to: req.query.sender,
                            subject: req.query.subject,
                            text: req.query.text
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                if (req.query.json) return res.status(500).json({
                                    status: "error"
                                });
                                res.status(500).render("email.ejs", {
                                    error: true,
                                    success: false,
                                    url: config.URL,
                                });
                            } else {
                                if (req.query.json) return res.status(500).json({
                                    status: "sent"
                                });
                                res.status(200).render("email.ejs", {
                                    error: false,
                                    success: true,
                                    url: config.URL,
                                });
                            }
                        });
                    } else {
                        if (req.query.json) return res.status(500).json({
                            status: "no text"
                        });
                        res.status(500).render("email.ejs", {
                            error: true,
                            success: false,
                            url: config.URL,
                        });
                    }
                } else {
                    if (req.query.json) return res.status(500).json({
                        status: "no subject"
                    });
                    res.status(500).render("email.ejs", {
                        error: true,
                        success: false,
                        url: config.URL,
                    });
                }
            } else {
                if (req.query.json) return res.status(500).json({
                    status: "no sender"
                });
                res.status(500).render("email.ejs", {
                    error: true,
                    success: false,
                    url: config.URL,
                });
            }
        } else {
          if (req.query.json) return res.status(500).json({
            status: "url incorrect"
          });
          res.status(500).render("email.ejs", {
            error: true,
            success: false,
            url: config.URL,
          });
        }
    }
}