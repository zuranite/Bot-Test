const { SlashCommandBuilder, MessageFlags } = require("discord.js")
const { EmbedCreator } = require("../../modules/EmbedCreator")
const { sleep } = require("../../modules/sleep");

const commandEnabled = false
if (!commandEnabled) return;



module.exports = {
    data: new SlashCommandBuilder()
    .setName("terminate")
    .setDescription("Terminate a user. Hangout Manager locked.")
    .addUserOption(option => option
        .setName("user")
        .setDescription("The user to terminate.")
        .setRequired(true))
    .addBooleanOption(option => option
        .setName("hardterm")
        .setDescription("Will kick the user from the server if true.")
        .setRequired(false)),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const commandUser = interaction.guild.members.cache.get(interaction.user.id)
        const user = interaction.guild.members.cache.get(interaction.options.getUser("user").id)
        const Hardterm = interaction.options.getBoolean("hardterm")
        const rolesOfUser = user.roles.cache
        const client = interaction.client
        const highestRoleofBot = interaction.guild.members.cache.get(client.user.id).roles.highest
        const LoggingChannel = client.channels.cache.get("1357029113608798419")
      
        

        // EMBEDS
        const TerminateSuccessEmbed = EmbedCreator(`Command run by ${interaction.user.tag}`, interaction.user.avatarURL(), "Successfully terminated!", undefined, "#26a639", [{ name: "User terminated:", value: `${user}`, inline: true}, { name: "Type:", value: "Soft Termination", inline: true}], true)
        const KickSuccessEmbed = EmbedCreator(`Command run by ${interaction.user.tag}`, interaction.user.avatarURL(), "Successfully terminated!", undefined, "#26a639", [{ name: "User terminated:", value: `${user}`, inline: true }, {name: "Type:", value: "Hard Termination", inline: true}], true)
        // const LogSuccessEmbed = EmbedCreator(`Command run by ${interaction.user.tag}`, interaction.user.avatarURL(), `Terminated user!`, undefined, 'Red', [{ name: User terminated}])
        function LogCreator(TypeofTermination) {
          const LogEmbed = new EmbedCreator(`Command run by ${interaction.user.tag}`, interaction.user.avatarURL(), "Terminated user", undefined, 'Red', [{ name: "__User Terminated:__", value: `${user}`, inline: true}, { name: "__Type of Termination:__", value: `${TypeofTermination}`, inline: true}])
          return LogEmbed
        }
        

        if (!commandUser.roles.cache.get("1241435633872932925")) {
            interaction.reply({ content: ":x: You have no permission to use this command!", flags: MessageFlags.Ephemeral})
            console.log(rolesOfUser)
            return;
        }

       if (user.user.bot) {
        interaction.reply({ content: ":robot: :x: Can't terminate a bot!", flags: MessageFlags.Ephemeral})
        return;
      }
      if (!Hardterm) {
        
       rolesOfUser.forEach(function(role) {
          
          //  console.log(role.position)
           // console.log(highestRoleofBot.position)
        if (role.position < highestRoleofBot.position)  {
         
          if (role.name === "@everyone") return;
          user.roles.remove(role)
          
        }

        else {
          interaction.reply({ content: " :x: The user has a higher role than the bot! This means that not all roles were able to be removed.", flags: MessageFlags.Ephemeral})
        }
        
        

      })
      function ReplySuccess() {
      if (user.roles.cache.size === 1) {
        interaction.reply({embeds: [TerminateSuccessEmbed]})
      }
      
      
      
      if (Hardterm) {
        const LoggingEmbed = LogCreator("Hard")
        user.kick("Terminated")
        interaction.reply({embeds: [KickSuccessEmbed]})
        LoggingChannel.send({embeds: [LoggingEmbed]})
        
      }
      else {
        const LoggingEmbed = LogCreator("Soft")
        LoggingChannel.send({embeds: [LoggingEmbed]})
      }
    
    }

      setTimeout(ReplySuccess, 1500)



    }}}