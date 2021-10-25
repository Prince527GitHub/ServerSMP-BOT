const DBD = require('discord-dashboard');
const CaprihamTheme = require('dbd-capriham-theme');
const settings = require("../setting.json");
const prefixSchema = require("../models/prefix");
const { readdirSync } = require('fs');
const guildRankcard = require("../models/guild-rankcard");

module.exports = async(client) => {

    async function getCommands () {
        let categories = []
        readdirSync('./commands/').forEach((dir) => {
            const directories = readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('js'))
            const commands = directories.map((command) => {
                const file = require(`../commands/${dir}/${command}`);
                const cmdName = file.name ? file.name : 'no command name'
                const cmdDescription = file.description ? file.description : 'no description'
                const cmdUsage = file.usage ? file.usage : 'no usage'
                let data;
                data = {
                    commandName: cmdName,
                    commandUsage: cmdUsage,
                    commandDescription: cmdDescription
                };
                categories.push(data)
            })
        })
        return categories
    }

    const Dashboard = new DBD.Dashboard({
        port: settings.config.port,
        client: {
            id: client.user.id,
            secret: process.env.SECRET
        },
        invite: {
            permissions: '124553522550',
            clientId: client.user.id,
            scopes: ["bot", "applications.commands"],
        },
        redirectUri: settings.config.redirectUri,
        domain: settings.config.domain,
        bot: client,
        theme: CaprihamTheme({
            privacypolicy: {
                websitename: client.user.username,
                websiteurl: settings.website.url,
                supportemail: settings.website.email
            },
            websiteName: client.user.username,
            iconURL: client.user.displayAvatarURL({ format: 'png' }),
            index: {
                card:{
                    title: settings.card.title,
                    description: settings.card.description,
                    image: settings.card.image,
                },
                information: {
                    title: "Information",
                    description: settings.information.description
                },
                feeds: {
                    title: "Stats",
                    list: [
                        {
                            icon: "fa fa-user",
                            text: `${client.channels.cache.size} users`,
                            timeText: " ",
                            bg: "bg-light-info"
                        },
                        {
                            icon: "fa fa-server",
                            text: `${client.guilds.cache.size} servers`,
                            timeText: " ",
                            bg: "bg-light-info"
                        }
                    ]
                }
            },
            commands: {
                pageTitle: "Commands",
                table: {
                    title: "List",
                    subTitle: `All ${client.user.username}'s commands`,
                    list:
                    await getCommands()
                }
            }
        }),
        settings: [
            {
                categoryId: 'setup',
                categoryName: "Setup",
                categoryDescription: "Setup the bot's settings!",
                categoryOptionsList: [
                    {
                        optionId: 'prefix',
                        optionName: "Prefix",
                        optionDescription: "Change bot's prefix",
                        optionType: DBD.formTypes.input('Prefix', 1, 10, false, true),
                        getActualSet: async ({guild}) => {
                            let result = await prefixSchema.find({ Guild: guild.id });
                            let prefix;
                            if(typeof result[0] == "undefined") {
                                prefix = process.env.PREFIX;
                            } else {
                                prefix = result[0].Prefix;
                            }
                            return prefix || false;
                        },
                        setNew: async ({guild,newData}) => {
                            await prefixSchema.findOne({ Guild: guild.id }, async(err, data) => {
                                if(newData === process.env.PREFIX) {
                                    if(data) return await data.delete();
                                    if(!data) return;
                                }
                                if(!data) {
                                    new prefixSchema({
                                        Guild: guild.id,
                                        Prefix: newData,
                                    }).save();
                                } else {
                                    data.Prefix = newData;
                                    data.save();
                                }
                            });
                            return;
                        }
                    },
                ]
            },
            {
                categoryId: 'xp',
                categoryName: "XP",
                categoryDescription: "Setup xp settings!",
                categoryOptionsList: [
                    {
                        optionId: 'guildrankcard',
                        optionName: "Guild RankCard",
                        optionDescription: "Change the guild rankcard option.",
                        optionType: DBD.formTypes.switch(false, false),
                        getActualSet: async ({guild}) => {
                            let result = await guildRankcard.find({ Guild: guild.id });
                            let prefix;
                            if(typeof result[0] == "undefined") {
                                prefix = false;
                            } else {
                                prefix = true;
                            }
                            return prefix || false;
                        },
                        setNew: async ({guild,newData}) => {
                            const guildId = await guild.id;
                            try {
                                await guildRankcard.findOne({ Guild: guildId }, async(err, data) => {
                                    if(newData === false) {
                                        if(!data) return;
                                        if(data) {
                                            await data.delete();
                                            return;
                                        }
                                    } else if(newData === true) {
                                        if(data) return;
                                        if(!data) {
                                            new guildRankcard({
                                                Guild: guildId,
                                                ProgressOption: false,
                                                ProgressBar: "#ffffff",
                                                StatusStyle: false,
                                                BackgroundOption: false,
                                                Background: "default",
                                            }).save();
                                        }
                                    }
                                });
                                return;
                            } catch (e) {
                                return;
                            }
                        }
                    },
                    {
                        optionId: 'progressoption',
                        optionName: "ProgressBar Option",
                        optionDescription: "Change the progress bar option.",
                        optionType: DBD.formTypes.switch(false, false),
                        getActualSet: async ({guild}) => {
                            let result = await guildRankcard.find({ Guild: guild.id });
                            let prefix;
                            if(typeof result[0] == "undefined") {
                                prefix = false;
                            } else {
                                prefix = result[0].ProgressOption;
                            }
                            return prefix || false;
                        },
                        setNew: async ({guild,newData}) => {
                            await guildRankcard.findOne({ Guild: guild.id }, async(err, data) => {
                                if(!data) return;
                                if(newData === false) {
                                    if(data) {
                                        data.ProgressBar = "#ffffff"
                                    }
                                    if(!data) return;
                                }
                                if(data) {
                                    data.ProgressOption = newData;
                                    return data.save();
                                } else return;
                            });
                            return;
                        }
                    },
                    {
                        optionId: 'progressbar',
                        optionName: "ProgressBar Color",
                        optionDescription: "Change the progress bar color.",
                        optionType: DBD.formTypes.colorSelect("#ffffff", false),
                        getActualSet: async ({guild}) => {
                            let result = await guildRankcard.find({ Guild: guild.id });
                            let prefix;
                            if(typeof result[0] == "undefined") {
                                prefix = "#ffffff";
                            } else {
                                prefix = result[0].ProgressBar;
                            }
                            return prefix || "#ffffff";
                        },
                        setNew: async ({guild,newData}) => {
                            await guildRankcard.findOne({ Guild: guild.id }, async(err, data) => {
                                if(!data) return;
                                if(newData === "#ffffff") {
                                    if(!data) return;
                                }
                                if(data.ProgressOption === false) return;
                                if(data) {
                                    data.ProgressBar = newData;
                                    return data.save();
                                } else return;
                            });
                            return;
                        }
                    },
                    {
                        optionId: 'statusstyle',
                        optionName: "Status Style",
                        optionDescription: "Change the status style.",
                        optionType: DBD.formTypes.switch(false, false),
                        getActualSet: async ({guild}) => {
                            let result = await guildRankcard.find({ Guild: guild.id });
                            let prefix;
                            if(typeof result[0] == "undefined") {
                                prefix = false;
                            } else {
                                prefix = result[0].StatusStyle;
                            }
                            return prefix || false;
                        },
                        setNew: async ({guild,newData}) => {
                            await guildRankcard.findOne({ Guild: guild.id }, async(err, data) => {
                                if(!data) return;
                                if(newData === false) {
                                    if(!data) return;
                                }
                                if(data) {
                                    data.StatusStyle = newData;
                                    return data.save();
                                } else return;
                            });
                            return;
                        }
                    },
                    {
                        optionId: 'backgroundoption',
                        optionName: "Background Option",
                        optionDescription: "Change the background Option.",
                        optionType: DBD.formTypes.switch(false, false),
                        getActualSet: async ({guild}) => {
                            let result = await guildRankcard.find({ Guild: guild.id });
                            let prefix;
                            if(typeof result[0] == "undefined") {
                                prefix = false;
                            } else {
                                prefix = result[0].BackgroundOption;
                            }
                            return prefix || false;
                        },
                        setNew: async ({guild,newData}) => {
                            await guildRankcard.findOne({ Guild: guild.id }, async(err, data) => {
                                if(!data) return;
                                if(newData === false) {
                                    if(data) {
                                        data.Background = "default"
                                    }
                                    if(!data) return;
                                }
                                if(data) {
                                    data.BackgroundOption = newData;
                                    return data.save();
                                } else return;
                            });
                            return;
                        }
                    },
                    {
                        optionId: 'background',
                        optionName: "Background",
                        optionDescription: "Change the background.",
                        optionType: DBD.formTypes.input('Prefix', 1, 200, false, true),
                        getActualSet: async ({guild}) => {
                            let result = await guildRankcard.find({ Guild: guild.id });
                            let prefix;
                            if(typeof result[0] == "undefined") {
                                prefix = "default";
                            } else {
                                prefix = result[0].Background;
                            }
                            return prefix || null;
                        },
                        setNew: async ({guild,newData}) => {
                            await guildRankcard.findOne({ Guild: guild.id }, async(err, data) => {
                                if(!data) return;
                                if(data.BackgroundOption === false) return;
                                if(newData === "default") {
                                    if(!data) return;
                                }
                                if(data) {
                                    data.Background = newData;
                                    data.save();
                                }
                            });
                            return;
                        }
                    },
                ]
            },
        ]
    });

    Dashboard.init();
}
