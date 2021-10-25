const { CommandInteraction, Client, MessageAttachment } = require('discord.js');
module.exports = {
    name: 'manipulate',
    description: 'Image manipulation',
    options: [
        {
          name: 'caution',
          description: "Create a caution sign!",
          type: "SUB_COMMAND",
          options: [{ name: 'text', description: "The text that you want to be displayed in the caution sign", type: "STRING", required: true }],
        },
        {
          name: 'clown',
          description: "Make someone a clown!",
          type: "SUB_COMMAND",
          options: [{name: 'user', description: "The user that you want to make a clown into", type: "USER", required: false}]
        },
        {
          name: 'gun',
          description: 'Get someones avatar holding a gun',
          type: "SUB_COMMAND",
          options: [{ name: "user", description: "The user that you want to hold the gun as", type: "USER", required: false }],
        },
        {
          name: 'oogway',
          description: "Make an oogway quote meme!",
          type: "SUB_COMMAND",
          options: [{ name: 'text', description: "The text that you want to be displayed in the oogway meme", type: "STRING", required: true }],
        },
        {
            name: 'pet',
            description: "Pet someone!",
            type: "SUB_COMMAND",
            options: [{ name: "user", description: "The user that you want to pet", type: "USER", required: false }]
        },
        {
            name: 'sadcat',
            description: "Make a sad cat meme!",
            type: "SUB_COMMAND",
            options: [{ name: 'text', description: "The text that you want to be displayed in the sadcat meme", type: "STRING", required: true }],
        },
        {
            name: 'wanted',
            description: "Be wanted and have a large bounty",
            type: "SUB_COMMAND",
            options: [{ name: "user", description: "The user that you want to make wanted", type: "USER", required: false }]
        },
        {
            name: 'ship',
            description: "Ship someone as a couple!",
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'user1', description: "The first user that you want to ship with the 2nd user", type: "USER", required: true,
                },
                {
                    name: 'user2', description: "The first user that you want to ship with the 1st user", type: "USER", required: true,
                }
            ]
        },
        {
            name: 'trigger',
            description: "Make a user triggered!",
            type: "SUB_COMMAND",
            options: [{ name: "user", description: "The user that you want to make triggered", type: "USER", required: false }]

        },
        {
            name: 'simp',
            description: "Give a user a simp stamp!",
            type: "SUB_COMMAND",
            options: [{ name: "user", description: "The user that you want to make simp-stamped!", type: "USER", required: false }]
        },
        {
            name: 'tweet',
            description: "Make a fake tweet!",
            type: "SUB_COMMAND",
            options: [
                {
                    name: 'text',
                    description: "The text that you want to tweet!",
                    type: "STRING",
                    required: true
                },
                {
                    name: 'user',
                    description: 'The user that you want to fake tweet as!',
                    type: "USER",
                    required: false
                }
            ]
        },
        {
         name: 'delete',
         description: "Permanently delete a user! 😳",
         type: "SUB_COMMAND",
         options: [{ name: 'user', description: "The user that you want to permantly delete! 😳", type: "USER", required: false }]
        },
        {
         name: 'supreme',
         description: "Make someone look like a goat! 🐐",
         type: "SUB_COMMAND",
         options: [{ name: 'user', description: "The user that you want to make as a goat!🐐", type: "USER", required: false }]
        },
        {
            name: 'shit',
            description: "Step on a ship!",
            type: "SUB_COMMAND",
            options: [{ name: 'user', description: "The user that you want to make as a shit! 💩", type: "USER", required: false }]
        },
        {
            name: 'gravestone',
            description: "Make a gravestone of a user!",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "The user that you want to make the gravestone in",
                type: "USER",
                required: false
            }]
        }
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    * @param {String[]} args
    */
    run: async (client, interaction, args, color) => {

        const unicode = (str) => {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
                .replace(/([^\w]+|\s+)/g, '-') // Replace space and other characters by hyphen
                .replace(/\-\-+/g, '-')	// Replaces multiple hyphens by one hyphen
                .replace(/(^-+|-+$)/, ''); // Remove extra hyphens from beginning or end of the string
        }

        const [subcommand] = args;
        const text = interaction.options.getString('text')?.trim()?.split(/ +/g)?.join("+");
        const member = interaction.options.getMember('user') || interaction.member;

        const user1 = interaction.options.getUser('user1')
        const user2= interaction.options.getUser('user2')

        function displayResult(url, file_name) {
            const file = new MessageAttachment(url, file_name)
            return interaction.followUp({ files: [file] })
        }

        if(subcommand === 'caution') { // CAUTION
           displayResult(`https://api.popcat.xyz/caution?text=${text}`, `caution-${interaction.user.id}.png`)
        } else if(subcommand === 'clown') {
           displayResult(`https://api.popcat.xyz/clown?image=${member.user.displayAvatarURL({format: 'png'})}`, `clown-${member.id}.png`)
        } else if(subcommand === 'gun') {
            displayResult(`https://api.popcat.xyz/gun?image=${member.user.displayAvatarURL({format: 'png'})}`, `gun-${member.user.id}.png`)
        } else if(subcommand === 'oogway') {
            displayResult(`https://api.popcat.xyz/oogway?text=${text}`, `oogway-${member.user.id}.png`)
        } else if(subcommand === 'pet') {
            displayResult(`https://api.popcat.xyz/pet?image=${member.user.displayAvatarURL({format: 'png'})}`, `pet-${member.id}.gif`)
        } else if(subcommand ==='sadcat') {
            displayResult(`https://api.popcat.xyz/sadcat?text=${text}`, `sadcat-${member.user.id}.png`)
        } else if(subcommand === 'wanted') {
            displayResult(`https://api.popcat.xyz/wanted?image=${member.user.displayAvatarURL({format: 'png'})}`, `wanted-${member.id}.png`)
        } else if(subcommand === 'ship') {
            const file = new MessageAttachment(`https://api.popcat.xyz/ship?user1=${user1.user.displayAvatarURL({format: 'png'})}&user2=${user2.user.displayAvatarURL({format: 'png'})}`, `ship-${user1.id}-${user2.id}.png`)
            interaction.followUp({files: [file]})
        } else if(subcommand === 'trigger') {
            displayResult(`https://some-random-api.ml/canvas/triggered?avatar=${member.user.displayAvatarURL({format: 'png'})}`, `triggered-${member.id}.gif`).catch();
        } else if(subcommand === 'simp') {
            displayResult(`https://api.popcat.xyz/simpstamp?image=${member.user.displayAvatarURL({format: 'png'})}`, `simpstamp-${member.id}.png`)
        } else if(subcommand === 'tweet') {
            const url = `https://some-random-api.ml/canvas/tweet?avatar=${member.user.displayAvatarURL({format: 'png'})}&comment=${text}&displayname=${unicode(`${member.displayName}`)}&username=${unicode(`${member.user.username}`)}`
            displayResult(url, `faketweet-${member.id}.png`)
        } else if(subcommand === `delete`) {
            displayResult(`https://luminabot.xyz/api/image/delete?image=${member.user.displayAvatarURL({format: 'png'})}`, `delete-${member.id}.png`)
        }  else if(subcommand === `supreme`) {
            displayResult(`https://luminabot.xyz/api/image/supreme?image=${member.user.displayAvatarURL({format: 'png'})}`, `supreme-${member.id}.png`)
        } else if(subcommand === `shit`) {
            displayResult(`https://luminabot.xyz/api/image/steppedinshit?image=${member.user.displayAvatarURL({format: 'png'})}`, `steppedinshit-${member.id}.png`)
        } else if(subcommand === 'gravestone') {
            displayResult(`https://luminabot.xyz/api/image/gravestone?image=${member.user.displayAvatarURL({format: 'png'})}&username=${unicode(`${member.displayName}`)}`, `gravestone-${member.id}.png`)
        }

    }
}
