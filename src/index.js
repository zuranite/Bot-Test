require('dotenv').config();

const express = require("express");
const expressapp = express()

expressapp.listen(3000, {})

expressapp.get("/", (req, res) => {
  res.send("Hello world!")
})

const { channel } = require('diagnostics_channel');
const { Client, IntentsBitField} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],

})

let ChannelsFetched = false


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));

}

const { EmbedBuilder } = require("discord.js");

let runtime = {
  hours : 0,
  mins : 0,
  seconds : 0

}
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
// Maybe lets the codespace stay active
function stayactive() {
  console.log("after 2 and a half minute")
  const GithubChannel = client.channels.cache.get("1354492831103844454")
  GithubChannel.send("test")
  GithubChannel.send({embeds: [RuntimeEmbed]})
}



let botIsReady = false
 

// Runs when the client(Bot) is online
client.on('ready', (c) => {
  console.log("Bot is ready for use.");
  botIsReady = true
  ChannelsFetched = true
  setInterval(stayactive, 150000)
  setInterval(RuntimeFunc, 1000)
  

})

function RuntimeFunc() {
console.log(runtime)
if (runtime.seconds === 59) {
  runtime.seconds = 0
  if (runtime.mins === 59 ) {
    runtime.mins = 0
    runtime.hours += 1

  }
  else {
  runtime.mins += 1}
}
else {
runtime.seconds += 1
}


}
 








client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'time') {
    const Embed = RuntimeEmbedFunc(runtime)
    interaction.reply({embeds: [Embed]})
  }
})



client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    interaction.reply('Pong!')
  }
})

client.login(process.env.TOKEN)

// lient.guilds.cache.get("1172883308087083018").channel.get("1354492831103844454").send("TESTTSTSTSTS")



