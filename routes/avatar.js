const fetch = require('node-fetch').default;
const request = require('request');

module.exports = {
    name: "api-ratelimit/avatar",

    run: async (req, res) => {
        const user = req.query.user;
        if (!user) return res.status(500).json({
            "ERROR": "No data"
        });

        let userrecoce;
        try {
            await fetch(`https://discord.com/api/v9/users/${user}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bot ${process.env.TOKEN}`,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(user => (userrecoce = user));
        } catch (e) {
            return res.status(500).json({
                "ERROR": "User not found"
            });
        }

        if (userrecoce.message) return res.status(200).send(userrecoce);

        if (userrecoce.avatar === null) return res.status(500).json({
            "ERROR": "User avatar not found"
        });

        let url;
        try {
            url = `https://cdn.discordapp.com/avatars/${await userrecoce.id}/${await userrecoce.avatar}.png?size=1024`
        } catch (e) {
            return res.status(500).json({
                "ERROR": "User not found"
            });
        }
        await res.set({
            'Content-Type': 'image/png'
        });

        await request({
            url: url,
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