const osu = require('node-osu');
require('dotenv').config();

let osuApi;
if(process.env.OSU_API !== "false") {
  osuApi = new osu.Api(process.env.OSU_API, {
    notFoundAsError: true,
    completeScores: false,
    parseNumeric: false
  });
}

module.exports = osuApi;
