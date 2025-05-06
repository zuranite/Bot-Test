const { Client, Member } = require("discord.js")
const { EmbedCreator } = require("../../modules/EmbedCreator.js")
const { channel } = require("diagnostics_channel")

/**
 * 
 * @param {Client} client 
 * @param {Member} member 
 */



module.exports = async (client, member) => {
    const WelcomeChannel = await member.guild.channels.fetch("1330144654112325705")
    const embed = EmbedCreator(undefined, undefined, " \<a:1catjump:1359969156484829404> Welcome to Zura Works!", ` Welcome ${member}! Enjoy your stay here! Make sure to read https://discord.com/channels/1330144654112325702/1366060433995206749. If you need any support, please refer to https://discord.com/channels/1330144654112325702/1369265586936483870. Have a nice day!`, "#fcb10f")
    WelcomeChannel.send({ embeds: [embed]})

}