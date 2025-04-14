const { SlashCommandBuilder } = require("discord.js")
const { execute } = require("./verify")

const commandEnabled = false

if (!commandEnabled) return;

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Pong!"),
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        await interaction.reply('Pong!!!')

    }
    
}