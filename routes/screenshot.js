const request = require('request');

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
    name: "api/screenshot",

    run: async (req, res) => {
        const url = req.query.url;
        if (!url) return res.status(500).json({
            "ERROR": "No data"
        });

        if (!isValidHttpUrl(url)) return res.status(500).json({
            "ERROR": "Not a url"
        });

        res.set({
            'Content-Type': 'image/png'
        });

        const newURL = `https://image.thum.io/get/width/1920/crop/675/noanimate/${url}`;
        request({
            url: newURL,
            encoding: null
        }, function (error, response, body) {
            if (error) return res.status(500).json({
                "ERROR": "User avatar error"
            })
            if (!error && response.statusCode == 200) {
                res.status(200).send(response.body);
            }
        });
    }
}