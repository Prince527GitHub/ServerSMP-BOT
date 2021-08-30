const { MessageEmbed, Message, Client } = require('discord.js');
function mathRandomInt(a, b) {if (a > b) {var c = a;a = b;b = c;}return Math.floor(Math.random() * (b - a + 1) + a);};

module.exports = {
    name: 'dice',
    description : "Roll a six-sided die.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const dice = mathRandomInt(1, 6)
        if (dice == 1) {
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Dice")
                .setDescription(`It was ${dice} on the dice.`)
                .setImage("https://i.imgur.com/IpdrHdQ.png")
            message.channel.send({ embeds: [embed] })
        } else if (dice == 2) {
            const embed2 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Dice")
                .setDescription(`It was ${dice} on the dice.`)
                .setImage("https://i.imgur.com/w1IbsxE.png")
            message.channel.send({ embeds: [embed2] })
        } else if (dice == 3) {
            const embed3 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Dice")
                .setDescription(`It was ${dice} on the dice.`)
                .setImage("https://i.imgur.com/dYBcXlp.png")
            message.channel.send({ embeds: [embed3] })
        } else if (dice == 4) {
            const embed4 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Dice")
                .setDescription(`It was ${dice} on the dice.`)
                .setImage("https://i.imgur.com/KCVtTVk.png")
            message.channel.send({ embeds: [embed4] })
        } else if (dice == 5) {
            const embed5 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Dice")
                .setDescription(`It was ${dice} on the dice.`)
                .setImage("https://i.imgur.com/mwZYzWw.png")
            message.channel.send({ embeds: [embed5] })
        } else if (dice == 6) {
            const embed6 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Dice")
                .setDescription(`It was ${dice} on the dice.`)
                .setImage("https://i.imgur.com/jPzK5hv.png")
            message.channel.send({ embeds: [embed6] })
        }
    }
}