const path = require('path');

module.exports = {
    name: "upload",

    run: async (req, res) => {
      res.status(200).sendFile(path.join(__dirname, '..', 'pages', 'index.html'));
    }
}