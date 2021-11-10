const config = require("../config.json");

module.exports = {
    name: "bot/data",

    run: async (req, res) => {
        if (req.query.cc && req.query.cd && req.query.cpu && req.query.cu && req.query.ec && req.query.ed && req.query.eu && req.query.ba && req.query.br && req.query.name && req.query.channels && req.query.users && req.query.roles && req.query.msg && req.query.msgdel && req.query.msgedit && req.query.ma && req.query.mr  && req.query.mu) {

            // ChannelCreate

            let ccMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedCC = req.query.cc.split(",");
            parsedCC.forEach(ccData => {
                if (ccData === '1') {
                    ccMonth.january.push('1');
                } else if (ccData === '2') {
                    ccMonth.february.push('1');
                } else if (ccData === '3') {
                    ccMonth.march.push('1');
                } else if (ccData === '4') {
                    ccMonth.april.push('1');
                } else if (ccData === '5') {
                    ccMonth.may.push('1');
                } else if (ccData === '6') {
                    ccMonth.june.push('1');
                } else if (ccData === '7') {
                    ccMonth.july.push('1');
                } else if (ccData === '8') {
                    ccMonth.august.push('1');
                } else if (ccData === '9') {
                    ccMonth.september.push('1');
                } else if (ccData === '10') {
                    ccMonth.october.push('1');
                } else if (ccData === '11') {
                    ccMonth.november.push('1');
                } else if (ccData === '12') {
                    ccMonth.december.push('1');
                }
            });

            // ChannelDelete

            let cdMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedCD = req.query.cd.split(",");
            parsedCD.forEach(cdData => {
                if (cdData === '1') {
                    cdMonth.january.push('1');
                } else if (cdData === '2') {
                    cdMonth.february.push('1');
                } else if (cdData === '3') {
                    cdMonth.march.push('1');
                } else if (cdData === '4') {
                    cdMonth.april.push('1');
                } else if (cdData === '5') {
                    cdMonth.may.push('1');
                } else if (cdData === '6') {
                    cdMonth.june.push('1');
                } else if (cdData === '7') {
                    cdMonth.july.push('1');
                } else if (cdData === '8') {
                    cdMonth.august.push('1');
                } else if (cdData === '9') {
                    cdMonth.september.push('1');
                } else if (cdData === '10') {
                    cdMonth.october.push('1');
                } else if (cdData === '11') {
                    cdMonth.november.push('1');
                } else if (cdData === '12') {
                    cdMonth.december.push('1');
                }
            });

            // ChannelPinUpdate

            let cpuMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedCPU = req.query.cpu.split(",");
            parsedCPU.forEach(cpuData => {
                if (cpuData === '1') {
                    cpuMonth.january.push('1');
                } else if (cpuData === '2') {
                    cpuMonth.february.push('1');
                } else if (cpuData === '3') {
                    cpuMonth.march.push('1');
                } else if (cpuData === '4') {
                    cpuMonth.april.push('1');
                } else if (cpuData === '5') {
                    cpuMonth.may.push('1');
                } else if (cpuData === '6') {
                    cpuMonth.june.push('1');
                } else if (cpuData === '7') {
                    cpuMonth.july.push('1');
                } else if (cpuData === '8') {
                    cpuMonth.august.push('1');
                } else if (cpuData === '9') {
                    cpuMonth.september.push('1');
                } else if (cpuData === '10') {
                    cpuMonth.october.push('1');
                } else if (cpuData === '11') {
                    cpuMonth.november.push('1');
                } else if (cpuData === '12') {
                    cpuMonth.december.push('1');
                }
            });

            // ChannelUpdate

            let cuMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedCU = req.query.cu.split(",");
            parsedCU.forEach(cuData => {
                if (cuData === '1') {
                    cuMonth.january.push('1');
                } else if (cuData === '2') {
                    cuMonth.february.push('1');
                } else if (cuData === '3') {
                    cuMonth.march.push('1');
                } else if (cuData === '4') {
                    cuMonth.april.push('1');
                } else if (cuData === '5') {
                    cuMonth.may.push('1');
                } else if (cuData === '6') {
                    cuMonth.june.push('1');
                } else if (cuData === '7') {
                    cuMonth.july.push('1');
                } else if (cuData === '8') {
                    cuMonth.august.push('1');
                } else if (cuData === '9') {
                    cuMonth.september.push('1');
                } else if (cuData === '10') {
                    cuMonth.october.push('1');
                } else if (cuData === '11') {
                    cuMonth.november.push('1');
                } else if (cuData === '12') {
                    cuMonth.december.push('1');
                }
            });

            // EmojiCreate

            let ecMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedEC = req.query.ec.split(",");
            parsedEC.forEach(ecData => {
                if (ecData === '1') {
                    ecMonth.january.push('1');
                } else if (ecData === '2') {
                    ecMonth.february.push('1');
                } else if (ecData === '3') {
                    ecMonth.march.push('1');
                } else if (ecData === '4') {
                    ecMonth.april.push('1');
                } else if (ecData === '5') {
                    ecMonth.may.push('1');
                } else if (ecData === '6') {
                    ecMonth.june.push('1');
                } else if (ecData === '7') {
                    ecMonth.july.push('1');
                } else if (ecData === '8') {
                    ecMonth.august.push('1');
                } else if (ecData === '9') {
                    ecMonth.september.push('1');
                } else if (ecData === '10') {
                    ecMonth.october.push('1');
                } else if (ecData === '11') {
                    ecMonth.november.push('1');
                } else if (ecData === '12') {
                    ecMonth.december.push('1');
                }
            });

            // EmojiDelete

            let edMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedED = req.query.ed.split(",");
            parsedED.forEach(edData => {
                if (edData === '1') {
                    edMonth.january.push('1');
                } else if (edData === '2') {
                    edMonth.february.push('1');
                } else if (edData === '3') {
                    edMonth.march.push('1');
                } else if (edData === '4') {
                    edMonth.april.push('1');
                } else if (edData === '5') {
                    edMonth.may.push('1');
                } else if (edData === '6') {
                    edMonth.june.push('1');
                } else if (edData === '7') {
                    edMonth.july.push('1');
                } else if (edData === '8') {
                    edMonth.august.push('1');
                } else if (edData === '9') {
                    edMonth.september.push('1');
                } else if (edData === '10') {
                    edMonth.october.push('1');
                } else if (edData === '11') {
                    edMonth.november.push('1');
                } else if (edData === '12') {
                    edMonth.december.push('1');
                }
            });

            // EmojiUpdate

            let euMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedEU = req.query.eu.split(",");
            parsedEU.forEach(euData => {
                if (euData === '1') {
                    euMonth.january.push('1');
                } else if (euData === '2') {
                    euMonth.february.push('1');
                } else if (euData === '3') {
                    euMonth.march.push('1');
                } else if (euData === '4') {
                    euMonth.april.push('1');
                } else if (euData === '5') {
                    euMonth.may.push('1');
                } else if (euData === '6') {
                    euMonth.june.push('1');
                } else if (euData === '7') {
                    euMonth.july.push('1');
                } else if (euData === '8') {
                    euMonth.august.push('1');
                } else if (euData === '9') {
                    euMonth.september.push('1');
                } else if (euData === '10') {
                    euMonth.october.push('1');
                } else if (euData === '11') {
                    euMonth.november.push('1');
                } else if (euData === '12') {
                    euMonth.december.push('1');
                }
            });

            // BanAdd

            let baMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedBA = req.query.ba.split(",");
            parsedBA.forEach(baData => {
                if (baData === '1') {
                    baMonth.january.push('1');
                } else if (baData === '2') {
                    baMonth.february.push('1');
                } else if (baData === '3') {
                    baMonth.march.push('1');
                } else if (baData === '4') {
                    baMonth.april.push('1');
                } else if (baData === '5') {
                    baMonth.may.push('1');
                } else if (baData === '6') {
                    baMonth.june.push('1');
                } else if (baData === '7') {
                    baMonth.july.push('1');
                } else if (baData === '8') {
                    baMonth.august.push('1');
                } else if (baData === '9') {
                    baMonth.september.push('1');
                } else if (baData === '10') {
                    baMonth.october.push('1');
                } else if (baData === '11') {
                    baMonth.november.push('1');
                } else if (baData === '12') {
                    baMonth.december.push('1');
                }
            });

            // BanAdd

            let brMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedBR = req.query.br.split(",");
            parsedBR.forEach(brData => {
                if (brData === '1') {
                    brMonth.january.push('1');
                } else if (brData === '2') {
                    brMonth.february.push('1');
                } else if (brData === '3') {
                    brMonth.march.push('1');
                } else if (brData === '4') {
                    brMonth.april.push('1');
                } else if (brData === '5') {
                    brMonth.may.push('1');
                } else if (brData === '6') {
                    brMonth.june.push('1');
                } else if (brData === '7') {
                    brMonth.july.push('1');
                } else if (brData === '8') {
                    brMonth.august.push('1');
                } else if (brData === '9') {
                    brMonth.september.push('1');
                } else if (brData === '10') {
                    brMonth.october.push('1');
                } else if (brData === '11') {
                    brMonth.november.push('1');
                } else if (brData === '12') {
                    brMonth.december.push('1');
                }
            });

            // MemberAdd

            let maMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedMA = req.query.ma.split(",");
            parsedMA.forEach(maData => {
                if (maData === '1') {
                    maMonth.january.push('1');
                } else if (maData === '2') {
                    maMonth.february.push('1');
                } else if (maData === '3') {
                    maMonth.march.push('1');
                } else if (maData === '4') {
                    maMonth.april.push('1');
                } else if (maData === '5') {
                    maMonth.may.push('1');
                } else if (maData === '6') {
                    maMonth.june.push('1');
                } else if (maData === '7') {
                    maMonth.july.push('1');
                } else if (maData === '8') {
                    maMonth.august.push('1');
                } else if (maData === '9') {
                    maMonth.september.push('1');
                } else if (maData === '10') {
                    maMonth.october.push('1');
                } else if (maData === '11') {
                    maMonth.november.push('1');
                } else if (maData === '12') {
                    maMonth.december.push('1');
                }
            });

            // MemberRemove

            let mrMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedMR = req.query.mr.split(",");
            parsedMR.forEach(mrData => {
                if (mrData === '1') {
                    mrMonth.january.push('1');
                } else if (mrData === '2') {
                    mrMonth.february.push('1');
                } else if (mrData === '3') {
                    mrMonth.march.push('1');
                } else if (mrData === '4') {
                    mrMonth.april.push('1');
                } else if (mrData === '5') {
                    mrMonth.may.push('1');
                } else if (mrData === '6') {
                    mrMonth.june.push('1');
                } else if (mrData === '7') {
                    mrMonth.july.push('1');
                } else if (mrData === '8') {
                    mrMonth.august.push('1');
                } else if (mrData === '9') {
                    mrMonth.september.push('1');
                } else if (mrData === '10') {
                    mrMonth.october.push('1');
                } else if (mrData === '11') {
                    mrMonth.november.push('1');
                } else if (mrData === '12') {
                    mrMonth.december.push('1');
                }
            });

            // MemberUpdate

            let muMonth = {
                "january": [],
                "february": [],
                "march": [],
                "april": [],
                "may": [],
                "june": [],
                "july": [],
                "august": [],
                "september": [],
                "october": [],
                "november": [],
                "december": [],
            }

            const parsedMU = req.query.mu.split(",");
            parsedMU.forEach(muData => {
                if (muData === '1') {
                    muMonth.january.push('1');
                } else if (muData === '2') {
                    muMonth.february.push('1');
                } else if (muData === '3') {
                    muMonth.march.push('1');
                } else if (muData === '4') {
                    muMonth.april.push('1');
                } else if (muData === '5') {
                    muMonth.may.push('1');
                } else if (muData === '6') {
                    muMonth.june.push('1');
                } else if (muData === '7') {
                    muMonth.july.push('1');
                } else if (muData === '8') {
                    muMonth.august.push('1');
                } else if (muData === '9') {
                    muMonth.september.push('1');
                } else if (muData === '10') {
                    muMonth.october.push('1');
                } else if (muData === '11') {
                    muMonth.november.push('1');
                } else if (muData === '12') {
                    muMonth.december.push('1');
                }
            });

            res.status(200).render("bot_data.ejs", {
                url: config.URL,
                name: req.query.name,
                msg: req.query.msg,
                msgdel: req.query.msgdel,
                msgedit: req.query.msgedit,
                channels: req.query.channels,
                users: req.query.users,
                roles: req.query.roles,
                cc: ccMonth,
                cd: cdMonth,
                cpu: cpuMonth,
                cu: cuMonth,
                ec: ecMonth,
                ed: edMonth,
                eu: euMonth,
                ba: baMonth,
                br: brMonth,
                ma: maMonth,
                mr: mrMonth,
                mu: muMonth,
            });

        }
    }
}