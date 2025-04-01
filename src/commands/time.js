const { SlashCommandBuilder } = require("discord.js")
const { EmbedBuilder } = require("discord.js");
const { runtime } = require('module')
console.log(runtime)




function RuntimeEmbedFunc(time) {
const RuntimeEmbed = new EmbedBuilder()
      .setColor("#26a639")
      .setTitle("Runtime")
      .addFields(
        { name: "Hours", value: `${time.hours}`, inline: true},
        { name: "Minutes", value: `${time.mins}`, inline: true},
        { name: "Seconds", value: `${time.seconds}`, inline: true},
      );
return RuntimeEmbed
    }





module.exports = {
    data: new SlashCommandBuilder().setName("time").setDescription("Shows runtime of bot."),
    run: ({ interaction }) => {
        
    }


    
}