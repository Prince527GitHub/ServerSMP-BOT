const { MessageEmbed, Message, Client } = require('discord.js');
function mathRandomInt(a, b) {if (a > b) {var c = a;a = b;b = c;}return Math.floor(Math.random() * (b - a + 1) + a);};

module.exports = {
    name: 'simplevel',
    category : 'meme',
    usage: '',
    description : "Show's your simp level.",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const random_simp = mathRandomInt(0, 100);
        if (random_simp >= 1 && random_simp <= 15) {
            const embed6 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("SimpLevel")
                .setDescription(`Your simp level is... ${random_simp}%!\nOnly a teensy bit of a simp, good for you!`)
            message.channel.send(embed6)
        } else if (random_simp >= 16 && random_simp <= 29) {
            const embed5 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("SimpLevel")
                .setDescription(`Your simp level is... ${random_simp}%!\nYou're a bit of a simp, but not enough for it to be an issue!`)
            message.channel.send(embed5)
        } else if (random_simp >= 30 && random_simp <= 49) {
            const embed4 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("SimpLevel")
                .setDescription(`Your simp level is... ${random_simp}%!\nHuh, I guess you're below average in terms simp levels! Not bad, I guess!`)
            message.channel.send(embed4)
        } else if (random_simp == 50) {
            const embed3 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("SimpLevel")
                .setDescription(`Your simp level is... ${random_simp}%!\nYou're.. equal levels of simp and non-simp? How does that even work?`)
            message.channel.send(embed3)
        } else if (random_simp == 69) {
            const embed2 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("SimpLevel")
                .setDescription(`Your simp level is... ${random_simp}%!\nNice! Well, it would be nice if it didn't mean you were a big ol' simp!`)
            message.channel.send(embed2)
        } else if (random_simp > 69) {
            const embed1 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("SimpLevel")
                .setDescription(`Your simp level is... ${random_simp}%!\nWow! That is a lot of simping.`)
            message.channel.send(embed1)
        } else {
            const embed0 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("SimpLevel")
                .setDescription(`Your simp level is... ${random_simp}%!\nNot a single drop of simpiness, impressive!`)
            message.channel.send(embed0)
        }
    }
}