const { Message, Client, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    name: '',
    usage: '[ level | xp ] [ userid ] [ amount ]',
    description: "Change level and xp of users.",
    owner: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const query = args[0].toLocaleLowerCase();
        
        if(!query) return message.reply("Please specify a query!")

        if(query === "level") {
            if(!args[2] || !args[3]) return message.reply("Please specify a userid or amount!")
            Levels.setLevel(args[2], message.guild.id, args[3]);

        } else if(query === "xp") {
            if(!args[2] || !args[3]) return message.reply("Please specify a userid or amount!")
            Levels.setXp(args[2], message.guild.id, args[3]);

        } else return message.reply("Query is incorrect!")
        
    }
}