const { SlashCommandBuilder } = require('discord.js');

let theCommandtoDelete = undefined

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-command')
		.setDescription('deletes a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to delete.')
				.setRequired(true))
        .addStringOption(option => option.setName("server-id").setDescription("for server only commands")),
	async execute(interaction) {
            const commandName = interaction.options.getString('command', true).toLowerCase();
            const serverId = interaction.options.getString("server-id", false)
            const command = interaction.client.commands.get(commandName);
    
            if (!command) {
                return interaction.reply(`There is no command with name \`${commandName}\`!`);
            }

           await delete require.cache[require.resolve(`./${command.data.name}.js`)];
         

           // Fetch the guild's commands
           const guild = interaction.client.guilds.cache.get(serverId)
           const serverregisteredcommands = await guild.commands.fetch();
           const globallyregisteredcommands = await interaction.client.application.commands.fetch()
            if (serverId) {
           theCommandtoDelete = serverregisteredcommands.find(cmd => cmd.name === commandName);} else {theCommandtoDelete = globallyregisteredcommands.find(cmd => cmd.name === commandName)}
           if (theCommandtoDelete) {
               await theCommandtoDelete.delete();
               interaction.reply(`Slash command ${commandName} has been removed.`);
           } else {
               interaction.reply(`Slash command ${commandName} not found.`);
           }
       },
           

            

        
        }
	


