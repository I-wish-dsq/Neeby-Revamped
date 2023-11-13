const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("jopa test")
    .setDMPermissions(false)
    .addSubcommand((subcommandgroup) => subcommandgroup
    .setName("user")
    .setDescription("jopa test")

       .addSubcommand((subcommand) => 
          subcommand
          .setName("role")
             .setDescription("user role")
               .addUserOption((option) => 
                  option.setName("user").setDescription("user config")
         )
       )
    .addSubcommand((subcommand) => 
       subcommand
       .setName("nickname")
          .setDescription("user nick")
          .addStringOption((option) => option.setName("nickname").setDescription("jopa config")
          )
            .addUserOption((option) => 
               option.setName("user").setDescription("user config")
         )
       )
    )
    .addSubcommand((subcommand) => 
    subcommand
    .setName("message")
       .setDescription("user mesage")
    )
    .toJSON(),
    userPermission: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.Connect],

    run: (client, interaction) =>{
        return interaction.reply("Test")
    }
 };