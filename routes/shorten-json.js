const Shorten = require("../assets/schema/shorten");
const config = require("../config.json");

function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

module.exports = {
    name: "api/shorten/json",

    run: async (req, res) => {
        const url = req.query.url;
        if (!url) return res.status(500).json({
            url: "No url specifyed.",
            url2: "No url specifyed."
        });
        if (!isValidHttpUrl(url)) return res.status(500).json({
            url: "Url is not a valid url.",
            url2: "Url is not a valid url."
        });

        const extension = req.query.extension;
        if (!extension) return res.status(500).json({
            url: "No extension specifyed.",
            url2: "No extension specifyed."
        });

        Shorten.findOne({
            Url: url
        }, async (err, data) => {
            if (data) return res.status(200).json({
                url: `${config.URL}/shorten/${data.Code}`,
                url2: `${config.URL2}/s/${data.Code}`
            });
            if (!data) {
                Shorten.findOne({
                    Code: extension
                }, async (err2, data2) => {
                    if (data2) return res.status(500).json({
                        url: "Extension already exist.",
                        url2: "Extension already exist."
                    });
                    if (!data2) {
                        new Shorten({
                            Code: extension,
                            Url: url,
                        }).save();
                        return res.status(200).json({
                            url: `${config.URL}/shorten?id=${extension}`,
                            url2: `${config.URL2}/s/${extension}`
                        })
                    }
                });
            }
        });
    }
}