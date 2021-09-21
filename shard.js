const { ShardingManager } = require("discord.js");
const chalk = require("chalk");
require('dotenv').config()

const manager = new ShardingManager(
  "./index.js",
  {
    totalShards: "auto",
    shardList: "auto",
    token: process.env.TOKEN,
  }
);

manager.on("shardCreate", async(shard) => {
  console.log(chalk.green(`[Information ${new Data()} Spawned ${shard.id}]`));
});

manager.spawn();
