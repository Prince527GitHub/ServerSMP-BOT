const simplydjs = require('simply-djs');
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    if(interaction.isButton()) {
        if(interaction.customId === "modlog-chc") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-chc-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-chc-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `channelCreate` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-chc-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `channelCreate` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-chd") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-chd-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-chd-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `channelDelete` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-chd-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `channelDelete` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-chpu") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-chpu-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-chpu-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `channelPinsUpdate` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-chpu-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `channelPinsUpdate` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-chu") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-chu-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-chu-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `channelUpdate` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-chu-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `channelUpdate` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-ed") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-ed-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-ed-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `emojiDelete` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-ed-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `emojiDelete` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-ec") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-ec-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-ec-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `emojiCreate` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-ec-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `emojiCreate` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-eu") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-eu-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-eu-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `emojiUpdate` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-eu-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `emojiUpdate` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-gba") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-gba-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-gba-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `guildBanAdd` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-gba-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `guildBanAdd` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-gbr") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-gbr-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-gbr-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `guildBanRemove` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-gbr-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `guildBanRemove` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-gma") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-gma-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-gma-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `guildMemberAdd` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-gma-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `guildMemberAdd` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-gmr") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-gmr-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-gmr-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `guildMemberRemove` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-gmr-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `guildMemberRemove` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-gmc") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-gmc-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-gmc-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `guildMemberChunk` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-gmc-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `guildMemberChunk` modlog.", ephemeral: true })
            }

        } else if(interaction.customId === "modlog-gmu") {
            if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You don't have perms.", ephemeral: true })
            if(await client.mongo_quick.has(`modlog-gmu-${interaction.guild.id}`) === true) {
                await client.mongo_quick.remove(`modlog-gmu-${interaction.guild.id}`)
                interaction.reply({ content: "Turn **on** `guildMemberUpdate` modlog.", ephemeral: true })
            } else {
                await client.mongo_quick.set(`modlog-gmu-${interaction.guild.id}`, "false")
                interaction.reply({ content: "Turn **off** `guildMemberUpdate` modlog.", ephemeral: true })
            }

        }

    }

    simplydjs.clickBtn(interaction)
});
