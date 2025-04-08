const { SlashCommandBuilder, MessageFlags } = require("discord.js")





    module.exports = {
        data: new SlashCommandBuilder()
            .setName('verify')
            .setDescription('Verify a user! Hangout Manager only.')
            .addUserOption(option => option.setName("user")
            .setDescription("User to verify.") ),
        async execute(interaction) {
            if (!interaction.isChatInputCommand()) return;
  

 const roles = [
  "1241514114174554214",
 "1241520238412169298",
 "1241514145287766096"
 ]
  if (interaction.commandName === 'verify') {
    const theuserthatinvoked = interaction.guild.members.cache.get(interaction.user.id)
    
    if (!theuserthatinvoked.roles.cache.get("1241435633872932925")) {
      const NoPermissionEmbed = indexexports.EmbedCreator(interaction.user.tag, interaction.user.avatarURL(), interaction.user.avatarURL(), 'Access Denied', 'You do not have the role Hangout Manager!', 'Red')
      interaction.reply({embeds: [NoPermissionEmbed]})
      return;
    }
    const useroption = interaction.options.getUser('user',true)
    const user = interaction.guild.members.cache.get(useroption.id)
    if (user.roles.cache.get(roles[1])) {
      await interaction.reply({ content: "User seems already verified!", flags: MessageFlags.Ephemeral })
      return;
    }

    
    roles.forEach(function(role){
      
      
      
      const roletoAdd = interaction.guild.roles.cache.get(role)
      user.roles.add(roletoAdd)
      
      

    });

    
    indexexports.sleep(1000)
    const SuccessEmbed = indexexports.EmbedCreator(interaction.user.tag, interaction.user.avatarURL(), 'Success! :tada:', `:white_check_mark: Successfully verified ${user}!`, '#26a639')
    const LogEmbed = indexexports.EmbedCreator(`Command run by ${interaction.user.tag}`, interaction.user.avatarURL(), `User verified :white_check_mark:`, undefined, "#de7e09", [{ name: "User verified:", value: `${user}`}])
    const logsChannel = interaction.client.channels.cache.get("1357029113608798419")
    if (user.roles.cache.get(roles)) {
    await interaction.reply({embeds: [SuccessEmbed]})
    logsChannel.send({embeds: [LogEmbed]})
    }
  
        }
    },
};
