const { SlashCommandBuilder, MessageFlags } = require("discord.js")
const { EmbedCreator } = require('../../modules/EmbedCreator.js')
const { sleep } = require('../../modules/sleep.js')




    module.exports = {
        data: new SlashCommandBuilder()
            .setName('verify')
            .setDescription('Verify a user! Hangout Manager only.')
            .addUserOption(option => 
              option.setName("user")
             .setDescription("User to verify.")
             .setRequired(true) ),

        async execute(interaction) {
          
            if (!interaction.isChatInputCommand()) return;
            const theuserthatinvoked = interaction.guild.members.cache.get(interaction.user.id)
            const useroption = interaction.options.getUser("user")
            const UserinGuild = interaction.guild.members.cache.get(useroption.id)


            const rolestoAdd = [
              "1241514114174554214",
             "1241520238412169298",
             "1241514145287766096"
             ]
            
            // Check if the user got permission to use this command
            if (!theuserthatinvoked.roles.cache.get("1241435633872932925")) {
              const NoPermissionEmbed = EmbedCreator(interaction.user.tag, interaction.user.avatarURL(), interaction.user.avatarURL(), 'Access Denied', 'You do not have the role Hangout Manager!', 'Red')
              interaction.reply({embeds: [NoPermissionEmbed]})
              return;
            }

            // Check if the user to verify already is verified
            if (UserinGuild.roles.cache.get(rolestoAdd[2])) {
              
              interaction.reply({ content: "User seems already verified!", flags: MessageFlags.Ephemeral })
              return;}


            // Add the roles
              rolestoAdd.forEach(function(role){
      
      
      
                const roletoAdd = interaction.guild.roles.cache.get(role)
                UserinGuild.roles.add(roletoAdd)
                
                
          
              });

    

    // Embeds
    const SuccessfulEmbed = EmbedCreator(interaction.user.tag, interaction.user.avatarURL(), 'Success! :tada:', `:white_check_mark: Successfully verified ${UserinGuild}!`, '#26a639')
    const LogEmbed = EmbedCreator(`Command run by ${interaction.user.tag}`, interaction.user.avatarURL(), `User verified :white_check_mark:`, undefined, "#de7e09", [{ name: "User verified:", value: `${UserinGuild}`}])
    const loggingChannel = interaction.client.channels.cache.get("1357029113608798419")

    
            function SuccessCheck() {
              if (UserinGuild.roles.cache.get(rolestoAdd[2])) {
              
              interaction.reply({embeds: [SuccessfulEmbed]})
              loggingChannel.send({embeds: [LogEmbed]})
              }
            }
            
           setTimeout(SuccessCheck, 1500)
          }

 

            }
          
