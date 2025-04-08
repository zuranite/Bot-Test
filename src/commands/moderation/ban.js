const { SlashCommandBuilder } = require('discord.js')

const commandEnabled = false
if (!commandEnabled) return;
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Moderators only. Ban a user.')
    .addUserOption(option => 
        option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option => 
        option.setName("length")
        .setDescription('How long should the ban be? Put in p for permanent.')
        .setRequired(true))
    .addStringOption(option => 
        option.setName("reason")
        .setDescription("The reason for the ban.")
        .setRequired(true))
    .addStringOption(option => 
        option.setName("evidence")
        .setDescription("Attach evidence. Attachments links, Imgur links, Gyazo and more work.")
        .setRequired(true)),
    async execute(interaction) {
        const userToban = interaction.options.getUser('user', true)
        const lengthforBan = interaction.options.getString('length', true)
        const reasonforBan = interaction.options.getString('reason', true)
        const evidenceforBan = interaction.options.getString('evidence', true)
    }
    
}