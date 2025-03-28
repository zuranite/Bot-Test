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


// Maybe lets the codespace stay active
function stayactive() {
  console.log("after 2 and a half minute")
  const GithubChannel = client.channels.cache.get("1354492831103844454")
  GithubChannel.send("test")
}




 

// Runs when the client(Bot) is online
client.on('ready', (c) => {
  console.log("Bot is ready for use.");
  ChannelsFetched = true
  setInterval(stayactive, 150000)
  

})
     















client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    interaction.reply('Pong!')
  }
})

client.login(process.env.TOKEN)

// lient.guilds.cache.get("1172883308087083018").channel.get("1354492831103844454").send("TESTTSTSTSTS")



