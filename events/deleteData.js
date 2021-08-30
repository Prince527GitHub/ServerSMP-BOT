const SchemaChatBot = require('../models/chatbot-channel');
const SchemaBlacklist = require('../models/blackwords');
const SchemaModLogs = require('../models/modlogs');
const SchemaGoodbye = require('../models/goodbye');
const SchemaWelcome = require('../models/welcome');
const prefixSchema = require('../models/prefix');
const SchemaGlobal = require('../models/global');
const SchemaCMD = require('../models/command');
const Schema = require('../models/invites');
const Levels = require("discord-xp");
const client = require('../index');
const db = require('quick.db');

client.on('guildDelete', async(guild) => {

    // Invite
    Schema.findOne({ Guild: guild.id }, async(err, data) => {
        if(data) data.delete();
    })

    // XP
    if(db.has(`xp-${guild.id}`) === true) db.delete(`xp-${guild.id}`)
    if(db.has(`xp-channel-${guild.id}`) === true) db.delete(`xp-channel-${guild.id}`)

    // Captcha
    if(db.has(`captcha-${guild.id}`) === true) db.delete(`captcha-${guild.id}`)

    // NSFW
    if(await client.mongo_quick.has(`nsfw-${guild.id}`) === true) await client.mongo_quick.remove(`nsfw-${guild.id}`)
    if(await client.mongo_quick.has(`nsfw-ch-${guild.id}`) === true) await client.mongo_quick.remove(`nsfw-ch-${guild.id}`)

    // Chatbot
    SchemaChatBot.findOne({ Guild: guild.id }, async(err, data) => {
        if(data) data.delete();
    })

    // Modlogs
    SchemaModLogs.findOne({ Guild: guild.id }, async(err, data) => {
        if(data) data.delete();
    })

    // Global
    SchemaGlobal.findOne({ Guild: guild.id }, async(err, data) => {
        if(data) data.delete();
    })

    // Prefix
    prefixSchema.findOne({ Guild : guild.id }, async(err, data) => {
        if(data) data.delete();
    })

    // Goodbye
    SchemaGoodbye.findOne({ Guild: guild.id }, async(err, data) => {
        if(data) data.delete();
    })

    // Welcome
    SchemaWelcome.findOne({ Guild: guild.id }, async(err, data) => {
        if(data) data.delete();
    })
    if(await client.mongo_quick.has(`welcome-type-${guild.id}`) === true) await client.mongo_quick.remove(`welcome-type-${guild.id}`)
    if(await client.mongo_quick.has(`welcome-theme-${message.guild.id}`) === true) await client.mongo_quick.remove(`welcome-theme-${message.guild.id}`)

    // CMD
    SchemaCMD.findOne({ Guild: guild.id }, async (err, data) => {
        if(data) data.delete();
    })

    // Autorole
    if(await client.mongo_quick.has(`autorole-${message.guild.id}`) === true) await client.mongo_quick.remove(`autorole-${message.guild.id}`)

    // Blacklist
    SchemaBlacklist.findOne({ Guild: guild.id }, async(err, data) => {
        if(data) data.delete();
    })

    // XP
    Levels.deleteGuild(guild.id);

});