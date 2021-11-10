const fetch = require('node-fetch').default;

module.exports = {
    name: "api-ratelimit/duck-dungeon",

    run: async (req, res) => {
      await fetch('https://duckdevs.me/assets/duckdungeon.json').then(res => res.text()).then(body => res.status(200).json(JSON.parse(body)))
    }
}