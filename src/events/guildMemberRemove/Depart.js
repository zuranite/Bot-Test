const { Client, Member } = require("discord.js")

/**
 * 
 * @param {Client} client 
 * @param {Member} member 
 */

module.exports = async (client, member) => {
    const DepartChannel = await member.guild.channels.fetch("1372084232708554814")
    DepartChannel.send(`**${member.user.tag}** *has left us :pensive:. Good byes :saluting_face:*`)

}