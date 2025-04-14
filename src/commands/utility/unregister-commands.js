const { exec } = require("child_process")
const { SlashCommandBuilder } = require("discord.js")

const commandEnabled = false
if (!commandEnabled) return;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unregister-commands')
    .setDescription("Unregisters all commands."),
    async execute(interaction) {
        interaction.client.application.commands.set([])
        
            interaction.reply("Successfully unregistered all commands.")
        
        console.log(interaction.client.application.commands)

    }
}