const {
  Client,
  CommandInteraction,
  MessageEmbed
} = require("discord.js");
const roleSchema = require("../../models/roles-colors");
const {
  Color,
  isColor
} = require("coloras");
const ColorHelper = require('color-to-name');

function arrayRemove(arr, value) {

  return arr.filter(function(ele) {
    return ele != value;
  });
}

module.exports = {
  name: "role-color",
  description: "Make cool role colors.",
  options: [{
      name: "create",
      description: "create role color",
      type: "SUB_COMMAND",
      options: [{
          name: "name",
          description: "name of color",
          type: "STRING",
          required: true
        },
        {
          name: "color",
          description: "color of role in hex",
          type: "STRING",
          required: true
        },
      ],
    },
    {
      name: "delete",
      description: "remove role color",
      type: "SUB_COMMAND",
      options: [{
          name: "name",
          description: "name of color",
          type: "STRING",
          required: true
        },
        {
          name: "color",
          description: "color of role in hex",
          type: "STRING",
          required: true
        },
      ],
    },
    {
      name: "list",
      description: "remove role color",
      type: "SUB_COMMAND",
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const subCommand = interaction.options.getSubcommand();
    if (!interaction.guild.me.permissions.has("MANAGE_ROLES")) return interaction.followUp({
      content: "I do not have permission to use this command!",
      ephemeral: true
    });
    if (interaction.guild.id !== "815190579213500437") return;

    if (subCommand === "create") {
      if (!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.followUp({
        content: "You do not have permissions to use this command!",
        ephemeral: true
      })
      const optionColor = interaction.options.getString("color");
      const colorCheck = isColor(optionColor);
      if (colorCheck.color === true) {
        if (colorCheck.colorSystem === "hex") {
          const colorName = interaction.options.getString("name");
          if (colorName.length > 35) return interaction.followUp({
            content: "Color name can't be more then 35 character."
          });
          roleSchema.findOne({
            Guild: interaction.guild.id
          }, async (err, data) => {
            if (data) {
              if (colorName.length > 100) return interaction.followUp({
                content: "Role color name can't be more then 100 characters."
              });
              if (data.Color.includes(colorName.toLowerCase())) return interaction.followUp({
                content: "A role color with that name allready exist."
              });
              if (data.color.length >= 25) return interaction.followUp({
                content: "A max of 25 role colors are allowed."
              });
              const role = await interaction.guild.roles.create({
                name: colorName.toLowerCase(),
                color: optionColor,
                reason: 'ServerSMP - BOT Color roles'
              });
              const number = Number(data.color.length) + 1;
              data.Color.push({
                number: {
                  "name": colorName.toLowerCase(),
                  "color": optionColor,
                  "id": role.id
                }
              });
              data.List.push({
                "name": colorName.toLowerCase(),
                "color": optionColor,
                "id": role.id
              });
              data.save();
            } else {
              const role = await interaction.guild.roles.create({
                name: colorName.toLowerCase(),
                color: optionColor,
                reason: 'ServerSMP - BOT Color roles'
              });
              new roleSchema({
                Guild: interaction.guild.id,
                Color: [{
                  1: {
                    "name": colorName.toLowerCase(),
                    "color": optionColor,
                    "id": role.id
                  }
                }],
                List: [{
                  "name": colorName.toLowerCase(),
                  "color": optionColor,
                  "id": role.id
                }],
              }).save();
            }
            return interaction.followUp({
              content: `Color role created ${colorName.toLowerCase()} with color ${optionColor}`
            });
          });
        } else return interaction.followUp({
          content: "Color is not in hex"
        });
      } else return interaction.followUp({
        content: "Color is not a color"
      });
    } else if (subCommand === "delete") {
      if (!interaction.member.permissions.has("MANAGE_ROLES")) return interaction.followUp({
        content: "You do not have permissions to use this command!",
        ephemeral: true
      })
      const roleColorId = interaction.options.getInteger("id");
      roleSchema.findOne({
        Guild: interaction.guild.id
      }, async (err, data) => {
        if (data) {
          if (data.Color.length === 1) {
            data.delete();
          } else {
            data.Color.pull({ roleColorId });
          }
        }
      });
    } else if (subCommand === "list") {
      roleSchema.findOne({
        Guild: interaction.guild.id
      }, async (err, data) => {
        if (data) {
          let colorList = [];
          await data.List.forEach(async (dataList) => {
            colorList.push({
              name: `*${data.List.map((_,i) => i+1)}* - **${dataList.name}**`,
              value: `\`${dataList.color}\` **-** *${await ColorHelper.findClosestColor(dataList.color).name}*`
            });
          });
          return interaction.followUp({
            embeds: [{
              color: 0x0099ff,
              title: 'Role Colors',
              fields: colorList,
            }]
          })
        } else return interaction.followUp({
          content: "No data"
        });
      });
    } else if (subCommand === "add") {

    } else if (subCommand === "remove") {

    }
  },
};
