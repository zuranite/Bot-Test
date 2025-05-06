const { SlashCommandBuilder, ActivityType } = require("discord.js")

const commandEnabled = true
if (!commandEnabled) return;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setstatus")
    .setDescription("Set the status/presence of the bot")
    .addStringOption(option => option
        .setName("statustype")
        .setDescription("The status type(Watching, Playing")
        .addChoices(
            { name: "Watching", value: "Watching" },
            { name: "Playing", value: "Playing" },
            { name: "Listening", value: "Listening" }, 
            { name: "Streaming", value: "Streaming"})
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName("title")
        .setDescription("The title for the activity/status.")
        .setRequired(true)
    ),
    async execute(interaction) {
        const statustype = interaction.options.get("statustype")
        const statustitle = interaction.options.getString("title")
        
        const type = ActivityType[statustype.value]
        

        interaction.client.user.setPresence({ activities: [{ name: statustitle, type: type}]})
    }
}