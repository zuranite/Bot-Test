const { SlashCommandBuilder } = require("discord.js")
// const { EmbedBuilder } = require("discord.js")
const { EmbedCreator } = require("../../modules/EmbedCreator.js")

const commandEnabled = true
if (!commandEnabled) return;


 

// function RuntimeEmbedFunc(time) {
//const RuntimeEmbed = new EmbedBuilder()
 //     .setColor("#26a639")
  //    .setTitle("Runtime")
    //  .addFields(
  //      { name: "Hours", value: `${time.hours}`, inline: true},
    //    { name: "Minutes", value: `${time.mins}`, inline: true},
     //   { name: "Seconds", value: `${time.seconds}`, inline: true},
   //   );
// return RuntimeEmbed
   // }





    // module.exports = {
    //   data: new SlashCommandBuilder()
    //     .setName('runtime')
    //     .setDescription('Runtime of bot.'),
    //   async execute(interaction) {
    //     const runtimeEmbed = RuntimeEmbedFunc(runtime)
    //     await interaction.reply({embeds: [runtimeEmbed]});

    //   },
    // };


    module.exports = {
        data: new SlashCommandBuilder()
            .setName('time')
            .setDescription('Runtime of bot'),
        async execute(interaction) {
            const { runtime }= require("../../index.js")
            const runtimeEmbed = EmbedCreator(undefined, undefined, "Runtime", undefined, "#26a639",[
                { name: "Hours", value: `${runtime.hours}`, inline: true}, 
                { name: "Minutes", value: `${runtime.mins}`, inline: true},
                { name: "Seconds", value: `${runtime.seconds}`, inline: true}])
            interaction.reply({embeds: [runtimeEmbed]});
        },
    };
    
  