const { MessageEmbed, Message, Client } = require('discord.js');
const { DiscordBattleShip } = require("discord-battleship");
const config = require('../../config.json')

const BattleShip = new DiscordBattleShip({ 
    embedColor: "RED",
    prefix: config.prefix,
});

module.exports = {
    name: 'battleship',
    category : 'games',
    usage: '[@user]',
    description : "Play battleship against another user.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        await BattleShip.createGame(message);
    }
}