const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');
const ver_file = require("../../version.json");
const fetch = require('node-fetch').default;

module.exports = {
    name: 'update',
    description : "The patch notes for this update.",
    usage: "[ current | latest ]",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const query = args[0]?.toLowerCase()
        if(!query) return message.channel.send("Please specify `current` or `latest` as the query.")

        if(query === "current") {
            try {
                const version = ver_file.version;
                fetch(`https://raw.githubusercontent.com/Prince527GitHub/ServerSMP/ServerSMP-BOT-(Change-Log)/patch-notes-${version}.txt`)
                .then(res => res.text())
                .then(body => message.channel.send(body));
            } catch(err) {
                return message.channel.send(`Unable to get patch notes for version ${version}, sorry.`)
            }

        } else if(query === "latest") {
            try {
                fetch(`https://raw.githubusercontent.com/Prince527GitHub/ServerSMP/ServerSMP-BOT-(Change-Log)/version.json`)
                .then(version => version.json())
                .then(async(data) => {
                    const latest_version = data.version;
                    fetch(`https://raw.githubusercontent.com/Prince527GitHub/ServerSMP/ServerSMP-BOT-(Change-Log)/patch-notes-${await latest_version}.txt`)
                    .then(res => res.text())
                    .then(body => message.channel.send(body));
                })
            } catch(err) {
                return message.channel.send(`Unable to get latest patch notes, sorry.`)
            }

        } else return message.channel.send("Only `current` or `latest` exist as the query.")
    }
}
