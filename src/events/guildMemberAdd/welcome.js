const { Client, Member } = require("discord.js")
const { EmbedCreator } = require("../../modules/EmbedCreator.js")
const { channel } = require("diagnostics_channel")

/**
 * 
 * @param {Client} client 
 * @param {Member} member 
 */



module.exports = async (client, member) => {
    const WelcomeChannel = member.guild.channels.find(channel.name === "general")
    const embbed = EmbedCreator(undefined, undefined, "Welcome to Zura Works!", ` Welcome ${member}!`)


}