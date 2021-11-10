const arrayImage = ["png","jpeg","jpg","gif"];
const config = require("../config.json");
const FormData = require('form-data');
const request = require('request');
const axios = require("axios");

module.exports = {
    name: "upload/:folder/:image",

    run: async (req, res) => {
        if(req.query.del && req.query.key) {
          if(req.query.key !== process.env.KEY) return res.status(500).json({ message: "An error has occurred" });
          const formData = new FormData();
          formData.append("file", `${req.params.folder}/${req.params.image}`);
          formData.append("key", req.query.key);
          return axios.post(`${process.env.URL}/upload?del=true`, formData, {
              headers: formData.getHeaders(),
              maxContentLength: Infinity,
              maxBodyLength: Infinity
            })
            .then(function (response) {
              return res.status(200).json({ message: response.data.message });
            })
            .catch(function (error) {
              return res.status(500).json({ message: "An error has occurred" });
            });
        }

        if(req.query.embed_name) {
          if(arrayImage.includes(`${req.params.image.split(".").slice(1)}`)) {
            if(req.query.embed_color) {
              if(req.query.embed_description) {
                return res.render("uploader.ejs", {
                  embed_name: req.query.embed_name,
                  embed_color: `#${req.query.embed_color}`,
                  embed_description: req.query.embed_description,
                  param: `${req.params.folder}/${req.params.image}`,
                  url: config.URL,
                });
              } else return res.render("uploader.ejs", {
                embed_name: req.query.embed_name,
                embed_color: `#${req.query.embed_color}`,
                embed_description: "",
                param: `${req.params.folder}/${req.params.image}`,
                url: config.URL,
              });
            } else return res.render("uploader.ejs", {
              embed_name: req.query.embed_name,
              embed_color: "#95A5A6",
              embed_description: "",
              param: `${req.params.folder}/${req.params.image}`,
              url: config.URL,
            });
          }
        }

        request({
            url: `${process.env.URL}/upload/${req.params.folder}/${req.params.image}`,
            encoding: null
        }, function (error, response, body) {
            if (error) {
                console.log(error)
                return res.status(500).send("ERROR");
            }
            if (!error && response.statusCode == 200) {
                res.set({
                    'Content-Type': response.headers['content-type']
                });
                res.status(200).send(response.body);
            } else return res.sendStatus(404);
        });
    }
}