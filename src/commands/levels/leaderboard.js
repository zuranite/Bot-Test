const { SlashCommandBuilder } = require("discord.js")
const { EmbedCreator } = require("../../modules/EmbedCreator.js")
const Level = require("../../Models/Level.js")

const commandEnabled = true;
if (!commandEnabled) return;




module.exports = {
    data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows top 10 users levels leaderboard."),
    async execute(interaction) {
        let fields = []
        let top10 = {}

        const Top3 = [1, 2, 3]
        async function Top3TextLb(value, index) {
            if (index + 1 === 1) {
                top10.name = '\u200b'
                top10.value = `🥇. <@${value.userId}> **LEVEL:** ${value.level}`
                await fields.push(top10)
                top10 = {}
            } else if (index + 1 === 2) {
                top10.name = "\u200b"
                top10.value = `🥈. <@${value.userId}> **LEVEL:** ${value.level}`
                await fields.push(top10)
                top10 = {}
            } else if (index + 1 === 3) {
                top10.name = "\u200b"
                top10.value = `🥉. <@${value.userId}> **LEVEL:** ${value.level}`
                await fields.push(top10)
                top10 = {}
            }
        } 
        let allLevels = await Level.find({ guildId: interaction.guild.id})

        allLevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp
            } else {
                return b.level - a.level
            }
        })

        let top10Levels = allLevels.slice(0, 11)
        

        top10Levels.forEach(async (value, index) => {
            if (Top3[index + 1]) {
                Top3TextLb(value, index)
            } else {
                top10.name = '\u200b'
                top10.value = `${index + 1}. <@${value.userId}> **LEVEL:** ${value.level}`
                console.log(top10)
                await fields.push(top10)
                top10 = {}
            }
        })

        const top10Embed = EmbedCreator(undefined, undefined, undefined, undefined, undefined, fields)
        interaction.reply({ embeds: [top10Embed]})
    }
}