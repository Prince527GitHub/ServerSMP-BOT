const client = require('../index');

client.on('ready', () => {
    client.user.setPresence({status: 'dnd',activity: {name: `DiamondGolurk on youtube.com`,type: "WATCHING"}})
    console.log(`${client.user.username} ✅`)
})
