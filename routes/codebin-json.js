const Codebin = require("../assets/schema/codebin");
const Str = require('@supercharge/strings');
const config = require("../config.json");

module.exports = {
    name: "api/codebin/json",

    run: async (req, res) => {
        const text = req.query.text;
        if (!text) return res.status(500).send({
            url: "Error no text defined.",
            url2: "Error no text defined."
        });
        if (text === "Enter text to bin...") return res.status(500).send({
            url: "Text can't be default text.",
            url2: "Text can't be default text."
        });
        if (text.length > 10000) return res.status(500).send({
            url: "Text can't have more then a length of 10000.",
            url2: "Text can't have more then a length of 10000."
        });

        Codebin.findOne({
            Text: text
        }, async (err, data) => {
            if (data) return res.status(200).json({
                url: `${config.URL}/codebin/${data.Code}`,
                url2: `${config.URL2}/c/${data.Code}`
            });
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
                                Text: text,
                            }).save();
                            res.status(200).json({
                                url: `${config.URL}/codebin/${random}`,
                                url2: `${config.URL2}/c/${random}`
                            });
                        }
                    });
                }
                isData(random);
            }
        });
    }
}