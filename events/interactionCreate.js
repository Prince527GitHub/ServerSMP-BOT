const client = require("../index");
const Userstats = require("../models/user-stats");
const customCommandModel = require("../models/cc-slash");

client.on("interactionCreate", async (interaction) => {

    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (cmd) {

          Userstats.findOne({ User: interaction.member.user.id }, async(err, data) => {
            if(data) {
              data.CmdUsed = `${Number(data.CmdUsed) + 1}`;
              data.save();
            }
            if(!data) {
              new Userstats({
                User: interaction.member.user.id,
                CmdUsed: "1",
              }).save();
            }
          });

          const args = [];

          for (let option of interaction.options.data) {
              if (option.type === "SUB_COMMAND") {
                  if (option.name) args.push(option.name);
                  option.options?.forEach((x) => {
                      if (x.value) args.push(x.value);
                  });
              } else if (option.value) args.push(option.value);
          }

          if(!interaction.guild) return interaction.followUp({ content: "You have to be in a guild to use slash commands!" });

          interaction.member = interaction.guild.members.cache.get(interaction.user.id);

          if(!interaction.member.permissions.has(cmd.userPermissions || [])) return interaction.followUp({ content: "You do not have permissions to use this command!", ephemeral: true })
          if(!interaction.guild.me.permissions.has(cmd.botPermission || [])) return interaction.followUp({ content: "I do not have permission to use this command!", ephemeral: true });

          cmd.run(client, interaction, args);

          if(await client.db_mongo.has(`${client.user.username}-cmdUsed`) === true) {
            await client.db_mongo.set(`${client.user.username}-cmdUsed`, `${Number(await client.db_mongo.get(`${client.user.username}-cmdUsed`)) + 1}`);
          }
        } else {
          const customCommand = await customCommandModel.findOne({
            commandName: interaction.commandName,
            guildId: interaction.guild.id
          });

          if(await client.db_mongo.has(`${client.user.username}-cmdUsed`) === true) {
            await client.db_mongo.set(`${client.user.username}-cmdUsed`, `${Number(await client.db_mongo.get(`${client.user.username}-cmdUsed`)) + 1}`);
          }

          if(!customCommand) return interaction.followUp({ content: "An error has occured " });

          return interaction.followUp({ content: customCommand.response });

        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
