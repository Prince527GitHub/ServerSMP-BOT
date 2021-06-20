const config = require(`./config.json`);
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./index.js", {
  shardCount: "2",
  token: config.token,
});

manager.on("shardCreate", (shard) =>
  console.log(`${shard.id} | Shard Loaded ✅!`)
);
manager.spawn();