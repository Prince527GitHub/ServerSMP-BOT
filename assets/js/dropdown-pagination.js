const { Message, MessageActionRow, MessageSelectMenu } = require("discord.js")
/**
 *
 * @param {Message} message
 * @param {Array} pages
 */
module.exports = async (message, pages) => {
    if(!pages || !message) throw new TypeError(`Please supply both message and a pages array!`)
    const { author } = message
    let count = 0;
    let pos = 0
    let dropdowns = []
    pages.forEach(() => {
        const newPos = pos++
        dropdowns.push({
            label: `#${newPos}`,
            description: `Click this to jump to the ${newPos} page!`,
            value: `${newPos}`
        })
    })
    const row = new MessageActionRow()
    .addComponents([
        new MessageSelectMenu()
        .setPlaceholder("Choose a page!")
        .addOptions(dropdowns)
        .setCustomId("queue_pagination")
    ])
    const baseMessage = await message.reply({embeds: [pages[count]], components: [row]})
    const collector = baseMessage.createMessageComponentCollector({componentType: "SELECT_MENU", time: 15000})
    collector.on("collect", async (interaciton) => {
        if(interaciton.isSelectMenu()) {
            if(interaciton.customId === "queue_pagination") {
                if(interaciton.user.id !== message.author.id) return;
                const newPage = interaciton.values[0]
                await interaciton.deferUpdate()
                await interaciton.message.edit({embeds: [pages[newPage]]})
            }
        }
    })
}
